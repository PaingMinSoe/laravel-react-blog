import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

export default function CropImageModal({imgSrc, onCropComplete, setIsOpen}) {
    const [crop, setCrop] = useState({aspect: 1});
    const [imageRef, setImageRef] = useState(null);

    const saveCropImage = () => {
        // const image = new Image();
        // image.src = imgSrc;
        // console.log(image);

        // image.onload = () => {
            
        // };

        const canvas = document.createElement('canvas');
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            const ctx = canvas.getContext('2d');
    
            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio; 
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';
    
            ctx.drawImage(
                imageRef,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
    
            onCropComplete(canvas);
            setIsOpen(false);
    }

    const onImageLoad = (e) => {
        const {naturalWidth: width, naturalHeight: height } = e.currentTarget;
        setImageRef(e.currentTarget);

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 50,
                },
                1,
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
            <div className="max-w-4xl flex flex-col justify-around items-center space-y-2 p-5 rounded-lg bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <ReactCrop 
                        crop={crop} 
                        circularCrop
                        keepSelection
                        aspect={1}
                        onChange={c => setCrop(c)}
                    >
                        <img src={imgSrc} onLoad={onImageLoad} alt="Crop" style={{ maxHeight: '500px' }} />
                    </ReactCrop>
                <button onClick={saveCropImage} className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>
                    Search
                </button>
            </div>
        </div>
    )
}