import PropTypes from 'prop-types';

const Filters = ({ filterTags, handleFilterChange }) => {
  const filters = {
    company: ['All', 'Apple', 'Samsung', 'Google'],
    color: ['All', 'Red', 'Purple', 'White', 'Brown'],
    price: ['All', '250+', '500+'],
  };
  return (
    <div className="mr-2">
      <div className="flex   flex-wrap justify-start  md:justify-end ">
        {Object.entries(filters).map(([key, options]) => (
          <div className="relative " key={key}>
            <div className=" ml-4 absolute top-[-5px] ">{key}</div>
            <select
              value={filterTags[key]}
              onChange={e => handleFilterChange(key, e.target.value)}
              className="m-2 p-2 min-w-[120px] rounded-xl border-[1px] border-gray-200"
            >
              {options.map(option => (
                <option className="m-1 " key={option} value={option?.toLowerCase()}>
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
  productCount: PropTypes.number,
};

export default Filters;
