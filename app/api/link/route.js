
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("MultiMantra");
    const collection = db.collection("link collector");

// if handle is already present in the database then return error
    const existingLink = await collection.findOne({ handle:body.handle})

    if (existingLink) {
        return Response.json({error: true, message: "Handle already exists" , success : false , result : null,})
    }

    const result = await collection.insertOne(body)
    return Response.json({error: false, message: "Link is added" , success : true , result : result,  })
  }

  export default async function handler(req, res) {
    const { handle } = req.query;
  
    // Database ya file system se check karo
    const exists = await checkIfHandleExists(handle); // apni logic yaha
    res.status(200).json({ exists });
  }