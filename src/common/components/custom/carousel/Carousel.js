import React, { useEffect, useState } from "react";
import "./carouselStyle.css";
import { IconButton } from "@mui/material";
import { KeyboardArrowRightOutlined, KeyboardArrowLeftOutlined, DeleteForever } from "@mui/icons-material";

export const CarouselItem = ({ img, setIdx, width, view = false }) => {
    const btnSx = { marginLeft: "8px", marginTop: "-20px", position: "relative", bottom: "100px", color: "#009992", background: "white", border: "1px solid", padding: "1px" };
    return (
        <div className="carousel-item" style={{ width: width }}>
            {img.image ? <object data={img.image} height="100%" width="auto" ></object> :
                <img src={`${process.env.REACT_APP_API_URL}/resource/api/auth/multimedia/download?id=${img.id}`} height="100%" width="auto" ></img>}
            {!view && <IconButton sx={btnSx} onClick={() => setIdx(img)}><DeleteForever /></IconButton>}
        </div>
    );
};

const Carousel = ({ children, idx }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };


    useEffect(() => {
        updateIndex(idx - 1);
    }, [idx]);


    return (
        <div className="carousel" >
            <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }} >
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { width: "100%" });
                })}
            </div>
            {children.length > 1 &&
                <div className="indicators">
                    <IconButton type="button" onClick={() => updateIndex(activeIndex - 1)} ><KeyboardArrowLeftOutlined /> </IconButton>
                    {/* {React.Children.map(children, ({ }, index) => {
                    return (<button type="button" className={`${index === activeIndex ? "active" : ""}`} onClick={() => updateIndex(index)} > {index + 1} </button>);
                })} */}
                    <IconButton type="button" onClick={() => updateIndex(activeIndex + 1)} > <KeyboardArrowRightOutlined /></IconButton>
                </div>
            }
        </div>
    );
};

export default Carousel;
