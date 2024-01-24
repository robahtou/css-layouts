'use client';


const mainLayoutAdustment = {
  'default-layout': 'primarysidebar-position-flipped',
  'primarysidebar-position-flipped': 'default-layout'
};
const primarysidebarAdjustment = {
  'primarysidebar-left': 'primarysidebar-right',
  'primarysidebar-right': 'primarysidebar-left'
};

function Home() {
  const handleClick = e => {
    const primarysidebarPosition = e.target.classList[1];
    e.target.classList.replace(primarysidebarPosition, primarysidebarAdjustment[primarysidebarPosition]);

    const wrapper = document.querySelector('.wrapper');
    const mainLayout = wrapper?.classList[1];
    wrapper?.classList.replace(mainLayout, mainLayoutAdustment[mainLayout]);
  }

  return (
    <main>
      <div className="wrapper default-layout">
        <header className="titlebar">
          <div className="icon primarysidebar-left" onClick={handleClick}></div>
        </header>

        <section className="primarysidebar">
          <aside className="activitybar"></aside>
          <aside className="sidebar"></aside>
        </section>

        <section className="editor"></section>

        <footer className="statusbar"></footer>
      </div>
    </main>
  );
}


export default Home;
