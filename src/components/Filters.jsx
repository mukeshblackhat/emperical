import PropTypes from 'prop-types';

const Filters = ({ filterTags, handleFilterChange }) => {
  const filters = {
    company: ['All', 'Apple', 'Samsung', 'Google'],
    color: ['All', 'Red', 'Purple', 'White', 'Brown'],
    price: ['All', '250+', '500+'],
  };
  return (
    <div className="m-4 pr-4 lg:border-r-2">
      <div className="text-2xl">FILTERS</div>
      <div className="flex  lg:flex-col flex-wrap ">
        {Object.entries(filters).map(([key, options]) => (
          <div className="" key={key}>
            <div className="ml-4">{key}</div>
            <select
              value={filterTags[key]}
              onChange={e => handleFilterChange(key, e.target.value)}
              className="m-2 p-2 min-w-[120px] rounded-xl border-[1px] border-gray-200"
            >
              {options.map(option => (
                <option className="m-1 bg-white" key={option} value={option?.toLowerCase()}>
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
