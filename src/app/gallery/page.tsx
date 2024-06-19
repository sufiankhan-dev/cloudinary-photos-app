import GalleryGrid from "@/components/GalleryGrid";
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
        .execute() as { resources: SearchResults[] };

    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Gallery</h1>
                    <UploadButton />
                </div>
                <GalleryGrid 
                images={results.resources}
                />
            </div>
        </div>
    )
}

export default page