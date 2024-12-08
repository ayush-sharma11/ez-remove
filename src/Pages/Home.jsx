import { useState, useRef } from "react";
import { CircleCheckBig } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

const Home = () => {
    const [originalFile, setOriginalFile] = useState(null);
    const [originalFileName, setOriginalFileName] = useState("");
    const originalCanvasRef = useRef(null);
    const processedCanvasRef = useRef(null);
    const downloadLinkRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOriginalFile(file);
            setOriginalFileName(file.name.split(".")[0]);

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = originalCanvasRef.current;
                    const ctx = canvas.getContext("2d");

                    // Get the width of the container
                    const containerWidth =
                        document.querySelector(".conversion-card").offsetWidth;

                    // Calculate the scale factor based on the image width and container width
                    const scaleFactor = Math.min(containerWidth / img.width, 1); // Ensure the image does not exceed container width
                    const scaledWidth = img.width * scaleFactor; // Scale image width
                    const scaledHeight = Math.round(img.height * scaleFactor); // Maintain aspect ratio

                    // Set canvas dimensions
                    canvas.width = scaledWidth;
                    canvas.height = scaledHeight;

                    // Set a max width of the container to prevent the container from resizing
                    canvas.style.maxWidth = "100%";

                    // Draw the image scaled to fit the canvas
                    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConvert = async () => {
        if (!originalFile) return;

        const canvas = originalCanvasRef.current;
        const processedCanvas = processedCanvasRef.current;
        const ctx = processedCanvas.getContext("2d");

        // Convert canvas content to Blob
        const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
        );

        try {
            // Call removeBackground to process the image
            const processedBlob = await removeBackground(blob);

            const img = new Image();
            img.onload = () => {
                // Get the width of the container for processed image
                const containerWidth =
                    document.querySelector(".conversion-card").offsetWidth;

                // Calculate the scale factor based on the container width
                const scaleFactor = Math.min(containerWidth / img.width, 1); // Ensure the image does not exceed container width
                const scaledWidth = img.width * scaleFactor;
                const scaledHeight = Math.round(img.height * scaleFactor); // Maintain aspect ratio

                processedCanvas.width = scaledWidth;
                processedCanvas.height = scaledHeight;

                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                // Enable the download link
                processedCanvas.toBlob((processedBlob) => {
                    const url = URL.createObjectURL(processedBlob);
                    downloadLinkRef.current.href = url;
                    downloadLinkRef.current.download = `${originalFileName}-processed.png`;
                    downloadLinkRef.current.style.display = "block";
                });
            };
            img.src = URL.createObjectURL(processedBlob);
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    return (
        <>
            <header className="header-gradient text-center py-5">
                <div className="container">
                    <h1 className="display-4 mb-3">
                        Remove Background Effortlessly
                    </h1>
                    <p className="lead mb-4">
                        Professional image background remover at your fingertips
                    </p>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <CircleCheckBig className="me-2" />
                        <span>
                            Supported formats: JPEG, PNG, WEBP, and more
                        </span>
                    </div>
                </div>
            </header>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="conversion-card my-3">
                            <form id="converterForm">
                                <div className="mb-3">
                                    <label
                                        htmlFor="imageInput"
                                        className="form-label"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Original Image Preview:</label>
                                    <canvas
                                        ref={originalCanvasRef}
                                        style={{
                                            display: originalFile
                                                ? "block"
                                                : "none",
                                            margin: "10px auto",
                                            maxWidth: "100%",
                                        }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    id="convertBtn"
                                    className="btn btn-danger w-100 mt-3"
                                    onClick={handleConvert}
                                    disabled={!originalFile}
                                    style={{
                                        cursor: originalFile
                                            ? "pointer"
                                            : "not-allowed",
                                    }}
                                >
                                    Convert Image
                                </button>
                                <div className="mb-3 mt-4">
                                    <label>Processed Image Preview:</label>
                                    <canvas
                                        ref={processedCanvasRef}
                                        style={{
                                            display: processedCanvasRef.current
                                                ?.width
                                                ? "block"
                                                : "none",
                                            margin: "10px auto",
                                            maxWidth: "100%",
                                        }}
                                    />
                                </div>
                                <a
                                    ref={downloadLinkRef}
                                    id="downloadLink"
                                    className="btn btn-success w-100 mt-3"
                                    style={{ display: "none" }}
                                >
                                    Download Processed Image
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
