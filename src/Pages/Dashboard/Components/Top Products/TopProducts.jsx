const data = [
  "Zandu Bam",
  "Peracitamol 500mg",
  "Bathroom Essentials",
  "Band Aid",
];

export default function TopProducts({ topProducts = [] }) {
  console.log(topProducts);

  return (
    <div className="lg:absolute right-5  pt-[23px] bg-white rounded-[20px] w-full lg:w-[370px] lg:h-[451px]">
      <h1 className="text-[#05004E] pl-[15px] mb-[18px]">Top Products</h1>
      <table className=" text-sm text-left rtl:text-left w-full">
        <thead className="text-xs text-[#515B6B]  ">
          <tr>
            <th scope="col" className={`pl-[15px] text-[13px] text-[#96A5B8]`}>
              #
            </th>
            <th scope="col" className={`text-[13px] pl-[103px] text-[#96A5B8]`}>
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {topProducts?.map((product, i) => (
            <tr
            key={product.id}
              className=" border-b border-b-[#EDF2F6]"
              style={{
                borderBottom: i === data.length   && "none",
              }}
            >
              <td
                className="py-5  text-sm text-[#444A6D] pl-[34px] 
                  "
              >
                0{i + 1}
              </td>
              <td
                className="pt-[18px] pb-[15px] text-sm text-[#444A6D] pl-[34px] 
                  "
              >
                {product.productName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
