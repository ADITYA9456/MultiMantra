import PaymentPage from '@/component/PaymentPage'
import User from '@/app/models/User'
import connectDb from '@/public/db/connectDb'
import { notFound } from "next/navigation"
 

const Username = async ({ params }) => {
  const { username } = await params // Await params here

  // If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()

  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username
 
export async function generateMetadata({ params }) {
  const { username } = await params // Await params here too
  return {
    title: `Support ${username} - Multi Mantra`,
  }
}