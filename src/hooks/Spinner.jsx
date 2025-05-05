function Spinner() {
  return (
    <div className="w-100% absolute inset-0 flex h-dvh items-center justify-center">
      <div className="loader relative inline-block h-12 w-12 animate-spin rounded-full bg-white">
        <div className="absolute left-[6px] top-[10px] h-3 w-3 rounded-full bg-orange-500 shadow-[25px_2px,10px_22px]"></div>
      </div>
    </div>
  );
}

export default Spinner;
