import CloudinaryImage from "@/components/CloudinaryImage";
import UploadButton from "@/components/UploadButton"
import cloudinary from "cloudinary";

export type SearchResults = {
    public_id: string;
    tags: string[];
};

const page = async () => {
    const results = await cloudinary.v2.search
        .expression('resource_type:image')
        .sort_by('created_at', 'desc')
        .with_field("tags")
        .max_results(30)
        .execute() as {resources: SearchResults[]};

        console.log(results)

    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Gallery</h1>
                <UploadButton />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {results.resources.map((result) => (
                        <CloudinaryImage
                        path="/gallery"
                        key={result.public_id}
                        imageData={result}
                        alt="an image of something"
                        width="400"
                        height="300"
                        />
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default page