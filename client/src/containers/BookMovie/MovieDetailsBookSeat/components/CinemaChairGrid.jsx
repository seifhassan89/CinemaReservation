import { useEffect, useState } from 'react';
import CinemaChair from './CinemaChair';
import { useDispatch, useSelector } from 'react-redux';
import { getSeatsRequest, getSeatsResponse } from '../../../../store/Lookups/slice';

const CinemaChairGrid = ({ getSelectedSeat, hallId }) => {
  const dispatch = useDispatch();
  const { seats, reservedSeats } = useSelector((state) => state.lookups);
  const [filteredData, setFilteredData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const ROW_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, numRows);

  useEffect(() => {
    dispatch(getSeatsRequest());
    return () => {
      setFilteredData([]);
      setNumRows(0);
      setNumCols(0);
      setSelectedSeat(null);
      dispatch(getSeatsResponse([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seats.length > 0) {
      const filteredSeats = seats.filter((seat) => +seat.hallId === +hallId);
      setFilteredData(filteredSeats);
      const maxRow = Math.max(...filteredSeats.map((seat) => +seat.row.charCodeAt(0) - 65));
      const maxCol = Math.max(...filteredSeats.map((seat) => +seat.col));

      setNumRows(maxRow + 1);
      setNumCols(maxCol);
    }
  }, [seats, hallId]);

  useEffect(() => {
    if (reservedSeats?.length > 0) {
    }
  }, [reservedSeats]);

  const renderGrid = () => {
    const grid = [];

    for (let row = 0; row < numRows; row++) {
      const rowElements = [];

      for (let col = 0; col < numCols; col++) {
        const chairNumber = col + 1;
        const seat = filteredData.find((seat) => seat.row === ROW_LABELS[row] && seat.col === chairNumber);
        const reservedSeat = reservedSeats.find((reservedSeat) => +reservedSeat.seatId === +seat?.id);
        const isReserved = !!reservedSeat;
        const isSelected = +selectedSeat?.id === +seat?.id;
        const color = isReserved ? 'red' : 'green';
        rowElements.push(
          <div
            key={col}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              border: isSelected ? '2px solid black' : 'none',
              minWidth: '50px',
            }}
            onClick={() =>
              handleChooseSeatClick({ ...reservedSeat, ...seat, isReserved, id: seat.id, realSeatId: reservedSeat?.id })
            }>
            <span style={{ color: 'black' }}>{ROW_LABELS[row] + chairNumber}</span>
            <CinemaChair color={color} rowLabel={ROW_LABELS[row]} chairNumber={chairNumber} />
          </div>
        );
      }

      grid.push(
        <div key={row} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          {rowElements}
        </div>
      );
    }

    return grid;
  };

  const handleChooseSeatClick = (seat) => {
    setSelectedSeat(seat);
    getSelectedSeat(seat);
  };

  return <div>{renderGrid()}</div>;
};

export default CinemaChairGrid;
