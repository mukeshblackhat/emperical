import PropTypes from 'prop-types';

const Filters = ({ filterTags, handleFilterChange }) => {
  const filters = {
    company: ['All', 'Apple', 'Samsung', 'Google'],
    color: ['All', 'Red', 'Purple', 'White', 'Brown'],
    price: ['All', '250+', '500+'],
  };
  console.log("Rendering Filter")
  return (
    <div className="m-4 border-r-2">
      <div>FILTERS</div>
      <div className="flex flex-col">
        {Object.entries(filters).map(([key, options]) => (
          <div key={key}>
            <div>{key} </div>
            <select
              value={filterTags[key]}
              onChange={e => handleFilterChange(key, e.target.value)}
              className="m-2 p-2 min-w-[120px] rounded-xl border-[1px] border-gray-200"
            >
              {options.map(option => (
                <option key={option} value={option?.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

Filters.propTypes = {
  filterTags: PropTypes.shape({
    company: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filters;
