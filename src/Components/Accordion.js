import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { FaAngleDown } from "react-icons/fa";

const AccordionItem = (props) => {
  const [active, setActive] = useState(null);
  const contentEl = useRef();
  const { faq, name, hours, id } = props;
  function handleToggle(id) {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  }
  useEffect(() => {
    console.log("AccordionItem");
  }, [faq]);
  return (
    <>
      <div className="rc-accordion-card">
        <div className="rc-accordion-header">
          <div
            className={`rc-accordion-toggle p-3  ${
              active === id ? "active bg-green-600" : "bg-[#ebedf0]"
            }`}
            onClick={() => handleToggle(id)}
          >
            <h5 className="rc-accordion-title"> Top 100 {name}</h5>
            <FaAngleDown className="icon" />
          </div>
        </div>
        <div
          ref={contentEl}
          className={`rc-collapse ${active === id ? "show" : ""}`}
          style={
            active === id
              ? { height: contentEl.current.scrollHeight }
              : { height: "0px" }
          }
        >
          <div className="rc-accordion-body">
            <div className="pb-8" key={id}>
              <div className="  overflow-x-auto ">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <Table
                    i={id}
                    name={name}
                    arr={faq}
                    hours={hours}
                    // handleUpdate={handleUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccordionItem;
