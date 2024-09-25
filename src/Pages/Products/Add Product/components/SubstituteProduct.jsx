import Button from "../../../../Common/Button";
import { DeleteIcon, PlusIcon } from "../../../../assets/icons";

const SubstituteProduct = ({ handleClick, product, isAdded = false }) => {
  return (
    <div className="flex items-center  justify-between">
      <div className="flex items-center gap-5">
        <div className="w-[62px] h-[62px] bg-white rounded flex items-center justify-center">
          <img
            src={"/bottle.png"}
            alt="image"
            className=" object-cover w-[36px] h-[52px] "
          />
        </div>
        <h6 className="text-sm text-[#06152B] w-[247px]">{product?.productName}</h6>
      </div>

      {isAdded ? (
        <Button
          onClick={() => handleClick(product?.id)}
          type="button"
          btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white"
        >
          <DeleteIcon />
        </Button>
      ) : (
        <Button
          onClick={() => handleClick(product)}
          type="button"
          btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white"
        >
          <span>Add</span>
          <PlusIcon color={"white"} width={15} height={15} />
        </Button>
      )}
    </div>
  );
};

export default SubstituteProduct;
