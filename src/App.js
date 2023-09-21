import React, { useState, useEffect } from "react";
import "./App.css";
import img1 from "./assests/img1.jpg";
import img2 from "./assests/img2.jpg";
import img3 from "./assests/img3.jpg";
import img4 from "./assests/img4.jpg";
import img5 from "./assests/img5.jpg";
import img6 from "./assests/img6.jpg";
import img7 from "./assests/img7.jpg";
import img8 from "./assests/img8.jpg";
import img9 from "./assests/img9.jpg";
import img10 from "./assests/img10.jpg";
import img11 from "./assests/img11.jpg";
import img12 from "./assests/img12.jpg";
import img13 from "./assests/img13.jpg";
import img14 from "./assests/img14.jpg";
import img15 from "./assests/img15.jpg";
import img16 from "./assests/img16.jpg";
import img17 from "./assests/img17.jpg";
import img18 from "./assests/img18.jpg";
import img19 from "./assests/img19.jpg";
import img20 from "./assests/img20.jpg";
import img21 from "./assests/img21.jpg";
import img22 from "./assests/img22.jpg";
import img23 from "./assests/img23.jpg";

export default function Gallery() {
  const [gallery, setGallery] = useState([
    { id: 1, src: img1, tag: "nature" },
    { id: 2, src: img2, tag: "nature" },
    { id: 3, src: img3, tag: "nature" },
    { id: 4, src: img4, tag: "nature" },
    { id: 5, src: img5, tag: "nature" },
    { id: 6, src: img6, tag: "nature" },
    { id: 7, src: img7, tag: "nature" },
    { id: 8, src: img8, tag: "nature" },
    { id: 9, src: img9, tag: "nature" },
    { id: 10, src: img10, tag: "nature" },
    { id: 11, src: img11, tag: "renaissance-art" },
    { id: 12, src: img12, tag: "renaissance-art" },
    { id: 13, src: img13, tag: "renaissance-art" },
    { id: 14, src: img14, tag: "modern-art" },
    { id: 15, src: img15, tag: "modern-art" },
    { id: 16, src: img16, tag: "modern-art" },
    { id: 17, src: img17, tag: "modern-art" },
    { id: 18, src: img18, tag: "modern-art" },
    { id: 19, src: img19, tag: "modern-art" },
    { id: 20, src: img20, tag: "modern-art" },
    { id: 21, src: img21, tag: "modern-art" },
    { id: 22, src: img22, tag: "modern-art" },
    { id: 23, src: img23, tag: "modern-art" },
  ])

  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const dragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id.toString());
  };

  const onDrag = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const draggedItemId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const update = [...gallery];
    const draggedItemIndex = update.findIndex(
      (element) => element.id === draggedItemId
    );

    const targetId = e.target.id.toString();
    const targetItemIdIndex = update.findIndex(
      (element) => element.id === parseInt(targetId, 10)
    );

    if (targetItemIdIndex !== -1 && draggedItemIndex !== -1) {
      const [draggedElement] = update.splice(draggedItemIndex, 1);
      console.log(draggedElement);
      update.splice(targetItemIdIndex, 0, draggedElement);
      setGallery(update);
    }
  };

  
  const onTouchStart = (e) => {
    const id = e.target.id.toString();
    e.dataTransfer.setData("text/plain", id);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    const draggedItemId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const update = [...gallery];
    const draggedItemIndex = update.findIndex(
      (element) => element.id === draggedItemId
    );

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) return;

    const targetId = target.id.toString();
    const targetItemIdIndex = update.findIndex(
      (element) => element.id === parseInt(targetId, 10)
    );

    if (targetItemIdIndex !== -1 && draggedItemIndex !== -1) {
      const [draggedElement] = update.splice(draggedItemIndex, 1);
      console.log(draggedElement);
      update.splice(targetItemIdIndex, 0, draggedElement);
      setGallery(update);
    }
  };

  const filteredGallery = gallery.filter(
    (element) => searchItem !== "" && element.tag.includes(searchItem)
  );

  useEffect(() => {
    const simulateImageLoading = () => {
      setTimeout(() => {
        setIsLoading(false); 
      }, 2000);
    };

    simulateImageLoading();
  }, []);

  return (
    <section className="gallery-container">
      <input
        type="text"
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search by tags"
      />
      <div className="gallery">
        {searchItem !== "" ? (
          filteredGallery.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                id={item.id.toString()}
                className="grid-item"
                draggable="true"
                onDragStart={dragStart}
                onDragOver={onDrag}
                onDrop={onDrop}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </div>
          ))
        ) : (
          gallery.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                id={item.id.toString()}
                className="grid-item"
                draggable="true"
                onDragStart={dragStart}
                onDragOver={onDrag}
                onDrop={onDrop}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
