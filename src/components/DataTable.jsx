import PropTypes from 'prop-types';

const ProductRow = ({ product, index }) => {

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2 font-bold">{product.name}</td>
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
    <div className="overflow-x-auto flex-1  m-4 ">
      <div className="overflow-y-scroll rounded-lg">
        <table className="min-w-full table-auto border-2">
          <thead className="bg-[#DAE0FC] sticky top-0">
            <tr className="text-left text-[#405BE7] bg-[#DAE0FC]">
              <th className="px-4  py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((product, index) => (
              <ProductRow product={product} index={index} key={product.id} />
            ))}
            {filterData.length === 0 && (
              <tr className="text-center bg-[#FEFE]">
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
