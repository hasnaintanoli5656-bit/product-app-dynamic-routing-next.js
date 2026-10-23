
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const instant = false;

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: ProductPageProps) => {
  const { id } = await params;


  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-slate-800">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-violet-600 px-6 py-3 text-white"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const data = await response.json();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-violet-600 hover:text-violet-800"
        >
          ← Back to Products
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
          {/* Product Image */}
          <div className="relative flex min-h-[350px] items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-8 sm:min-h-[500px]">
            <span className="absolute left-6 top-6 rounded-full bg-violet-600 px-4 py-2 text-sm font-bold text-white">
              {data.discountPercentage.toFixed(0)}% OFF
            </span>

            <Image
              src={data.thumbnail}
              alt={data.title}
              width={500}
              height={500}
              priority
              className="h-80 w-full object-contain sm:h-[420px]"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold capitalize text-violet-700">
                {data.brand}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                ● {data.availabilityStatus}
              </span>
            </div>

            <p className="mb-2 text-sm capitalize text-slate-500">
              Category: {data.category}
            </p>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {data.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-xl tracking-widest text-amber-400">
                ★★★★★
              </span>
              <span className="font-bold text-slate-800">
                {data.rating}
              </span>
              <span className="text-sm text-slate-500">
                ({data.reviews?.length ?? 0} reviews)
              </span>
            </div>

            <p className="mt-6 leading-7 text-slate-600">
              {data.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-4xl font-extrabold text-violet-700">
                $
                {(
                  data.price *
                  (1 - data.discountPercentage / 100)
                ).toFixed(2)}
              </span>

              <span className="text-lg text-slate-400 line-through">
                ${data.price.toFixed(2)}
              </span>

              <span className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600">
                Save {data.discountPercentage.toFixed(2)}%
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Available Stock</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {data.stock} units
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Weight</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {data.weight} g
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Minimum Order</p>
                <p className="mt-1 font-bold text-slate-900">
                  {data.minimumOrderQuantity}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">SKU</p>
                <p className="mt-1 break-all font-bold text-slate-900">
                  {data.sku}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
              <p>🚚 {data.shippingInformation}</p>
              <p>🛡️ {data.warrantyInformation}</p>
              <p>↩️ {data.returnPolicy}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {data.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/products"
              className="mt-8 rounded-xl bg-violet-600 px-6 py-4 text-center font-bold text-white transition hover:bg-violet-700"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;