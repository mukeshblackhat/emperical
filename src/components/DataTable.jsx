import PropTypes from 'prop-types';

const ProductRow = ({ product, index }) => {
  console.log("Rendering Product Row")

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{product.name}</td>
      <td className="px-4 py-2">
        {product.data
          ? Object.entries(product.data).map(([key, value]) => (
              <div key={key}>{`${key}: ${value}`}</div>
            ))
          : 'No additional data'}
      </td>
    </tr>
  );
};

ProductRow.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
};

const DataTable = ({ filterData }) => {
  console.log("Rendering DataTable")
  return (
    <div className="overflow-x-auto w-3/4 m-4 flex-1">
      <div className="overflow-y-scroll">
        <table className="min-w-full table-auto border-2">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((product, index) => (
              <ProductRow product={product} index={index} key={product.id} />
            ))}
            {filterData.length === 0 && (
              <tr className="text-center">
                <td></td>
                <td>No Device with this spec </td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  filterData: PropTypes.array,
};

export default DataTable;
