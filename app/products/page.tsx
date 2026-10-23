import Link from "next/link";

export const instant = false;

const page = async () => {
  const response = await fetch(`https://dummyjson.com/products?limit=12`);
  const { products } = await response.json();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-violet-600">
            Discover Your Favorites
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Our Products
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Explore our collection of amazing products at incredible prices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products && products.length > 0
            ? products.map((prod: any) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.id}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-100"
                >
                  <ProductCard data={prod} />
                </Link>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default page;

function ProductCard({ data }: any) {
  return (
    <div className=" w-[100%]">
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6 ">
        <span className="absolute left-4 top-4 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          -{data.discountPercentage.toFixed(0)}% OFF
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
            data.availabilityStatus === "In Stock"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.availabilityStatus}
        </span>

        <img
          src={data.thumbnail}
          alt={data.title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-bold capitalize text-violet-700">
            {data.brand}
          </span>

          <span className="text-xs capitalize text-slate-400">
            {data.category}
          </span>
        </div>

        <h2 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-violet-700">
          {data.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {data.description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-amber-400">★★★★★</span>
          <span className="text-sm font-bold text-slate-700">
            {data.rating}
          </span>
          <span className="text-xs text-slate-400">
            ({data.reviews?.length ?? 0} reviews)
          </span>
        </div>

        <div className="my-4 border-t border-slate-100" />

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="mb-1 text-xs text-slate-400">Price</p>

            <span className="text-2xl font-extrabold text-violet-700">
              ${(data.price * (1 - data.discountPercentage / 100)).toFixed(2)}
            </span>

            <p className="text-sm text-slate-400 line-through">
              ${data.price.toFixed(2)}
            </p>
          </div>

          <span className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {data.stock} in stock
          </span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-violet-700">
          View Product
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <p>🚚 {data.shippingInformation}</p>
          <p>🛡️ {data.warrantyInformation}</p>
          <p>↩️ {data.returnPolicy}</p>
        </div>
      </div>
    </div>
  );
}
