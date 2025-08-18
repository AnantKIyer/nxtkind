import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import { updateUser } from "@/lib/actions";
import Image from "next/image";
import { format } from "timeago.js";

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return <div className="">Not logged in!</div>;
  }

  const orderRes = await wixClient.orders.searchOrders({
    filter: { "buyerInfo.contactId": { $eq: user.member?.contactId } },
  });

  // Get profile image source
  const getProfileImageSrc = () => {
    const profile = user.member?.profile as { picture?: string } | undefined;
    if (profile?.picture) {
      return profile.picture;
    }
    return "/woman.png";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user.member?.contact?.firstName && user.member?.contact?.lastName) {
      return `${user.member.contact.firstName} ${user.member.contact.lastName}`;
    }
    if (user.member?.contact?.firstName) {
      return user.member.contact.firstName;
    }
    if (user.member?.loginEmail) {
      return user.member.loginEmail.split('@')[0];
    }
    return "User";
  };

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-6 mb-8">
          <Image
            src={getProfileImageSrc()}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{getUserDisplayName()}</h1>
            <p className="text-gray-600">{user.member?.loginEmail}</p>
            {getProfileImageSrc() !== "/woman.png" && (
              <p className="text-sm text-green-600">✓ Google Account</p>
            )}
          </div>
        </div>
        
        <form action={updateUser} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder={user.member?.contact?.firstName || "John"}
                className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Surname</label>
              <input
                type="text"
                name="lastName"
                placeholder={user.member?.contact?.lastName || "Doe"}
                className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
              />
            </div>
          </div>
          
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={
              (user.member?.contact?.phones &&
                user.member?.contact?.phones[0]) ||
              "+1234567"
            }
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user.member?.loginEmail || "john@example.com"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />

          <input type="hidden" name="id" value={user.member._id || ""} />

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors max-w-96"
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <div className="space-y-4">
          {orderRes.orders?.map((order) => (
            <div key={order._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Order #{order.number}</p>
                  <p className="text-sm text-gray-600">
                    {format(order._createdDate || new Date())}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  String(order.status).includes('FULFILLED') 
                    ? 'bg-green-100 text-green-800' 
                    : String(order.status).includes('PENDING') 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.status || 'UNKNOWN'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Total: ₹{order.priceSummary?.total?.amount}
              </p>
            </div>
          ))}
          {(!orderRes.orders || orderRes.orders.length === 0) && (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;