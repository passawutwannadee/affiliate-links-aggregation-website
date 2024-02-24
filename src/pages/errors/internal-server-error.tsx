const InternalServerError = () => {
  return (
    <div>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-6xl font-semibold text-primary">500</h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-2xl">
            Something is wrong with our server. Please try again later.
          </h3>
        </div>
      </main>
    </div>
  );
};

export default InternalServerError;
