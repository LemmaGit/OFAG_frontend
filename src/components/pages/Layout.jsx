function Layout({ children, marginTopLg }) {
  // overflow-auto
  return (
    <div className="bg-[#F4F7FC] rounded-3xl m-2 grid grid-cols-(--librarians-layout-grid-cols) gap-x-3 gap-y-5 pt-4 pb-2 overflow-y-auto">
      <div className={`col-start-2  ${marginTopLg ? "mt-8" : "mt-2"}`}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
