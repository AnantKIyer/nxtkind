'use client';

export default function CartModal() {

    const cartItems = false;

    return (
        <div className='absolute p-4 rounded-md shadow-box bg-white top-12 right-0 flex flex-col gap-6 z-20'>
            {!cartItems ? (
                <div>
                    Cart is Empty
                </div>
            ) : (
                <div>
                    {cartItems}
                </div>
            ) }
        </div>
    )
}