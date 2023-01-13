import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage()

const uploadToIPFS = async (file) => {
    const upload = await storage.upload(file)
    return storage.resolveScheme(upload)
}

export default uploadToIPFS;