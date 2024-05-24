import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

export default function CropImageModal({imgSrc, onCropComplete, setIsOpen}) {
    const [crop, setCrop] = useState(null);

    const saveCropImage = () => {
        const image = new Image();
        image.src = imgSrc;
        console.log(image);

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
    
            canvas.width = crop.width * scaleX;
            canvas.height = crop.height * scaleY; 
            const ctx = canvas.getContext('2d');
    
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width,
                crop.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
    
            onCropComplete(canvas);
            setIsOpen(false);
        };
    }

    const onImageLoad = (e) => {
        const {naturalWidth: width, naturalHeight: height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 50,
                },
                6/9,
                width,
                height
            ),
            width,
            height
        )

        setCrop(crop);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setIsOpen((prevState) => !prevState);
    }

    return (
        <div className='w-screen h-screen left-0 right-0 top-0 z-10 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 fixed flex justify-center items-center' onClick={closeModal}>
            <div className="w-3/4 max-w-4xl flex flex-col justify-around items-center space-y-2 p-5 rounded-lg bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <ReactCrop 
                        crop={crop} 
                        circularCrop
                        keepSelection
                        aspect={1}
                        onChange={c => setCrop(c)}
                    >
                        <img src={imgSrc} onLoad={onImageLoad} alt="Crop" />
                    </ReactCrop>
                <button onClick={saveCropImage} className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>
                    Search
                </button>
            </div>
        </div>
    )
}