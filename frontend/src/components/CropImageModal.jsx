import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

export default function CropImageModal({imgSrc, onCropComplete, setIsOpen}) {
    const [crop, setCrop] = useState(null);
    const [imageRef, setImageRef] = useState(null);

    const saveCropImage = () => {
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
                    <button className="self-end mb-2 hover:text-gray-400" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ReactCrop 
                        crop={crop} 
                        circularCrop
                        keepSelection
                        aspect={1}
                        onChange={c => setCrop(c)}
                    >
                        <img src={imgSrc} onLoad={onImageLoad} alt="Crop" style={{ maxHeight: '500px' }} />
                    </ReactCrop>
                <button onClick={saveCropImage} className='inline-flex px-4 py-1.5 font-semibold rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Crop
                </button>
            </div>
        </div>
    )
}