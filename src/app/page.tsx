'use client';


const mainLayout = {
  'layout-default': 'layout-secondary',
  'layout-secondary': 'layout-default'
};
const iconPrimarySwap = {
  'sidepanel-left': 'sidepanel-right',
  'sidepanel-right': 'sidepanel-left'
};
const iconSecondaryPositionSwap = {
  'sidepanel-right': 'sidepanel-left',
  'sidepanel-left': 'sidepanel-right',
  'sidepanel-hidden-left': 'sidepanel-hidden-right',
  'sidepanel-hidden-right': 'sidepanel-hidden-left'
};
const iconSecondaryVisibleSwap = {
  'sidepanel-hidden-left': 'sidepanel-left',
  'sidepanel-hidden-right': 'sidepanel-right',
  'sidepanel-right': 'sidepanel-hidden-right',
  'sidepanel-left': 'sidepanel-hidden-left'
};

function Page() {
  const handlePrimaryPanelClick = e => {
    const primaryIcon = e.target;
    const secondaryIcon = e.target.nextElementSibling;
    const main = document.getElementById('main');

    const currentPrimaryIcon = primaryIcon.classList[1];
    const currentSecondaryIcon = secondaryIcon.classList[1];
    const currentLayout = main.classList[1];

    primaryIcon.classList.replace(currentPrimaryIcon, iconPrimarySwap[currentPrimaryIcon]);
    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryPositionSwap[currentSecondaryIcon]);
    main.classList.replace(currentLayout, mainLayout[currentLayout]);
  };

  const handleSecondaryPanelClick = e => {
    const secondaryIcon = e.target;
    const secondarySidePanel = document.querySelector('.secondary-sidepanel');
    const currentSecondaryIcon = secondaryIcon.classList[1];
    const currentSecondarySidePanel = secondarySidePanel.classList[1];

    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryVisibleSwap[currentSecondaryIcon]);

    if (currentSecondarySidePanel === 'hidden') {
      secondarySidePanel?.classList.remove('hidden');
    } else {
      secondarySidePanel?.classList.add('hidden');
    }
  };

  return (
    <main id="main" className="grid layout-default">
      <header className="titlebar">
        <div className="icon sidepanel-left" onClick={handlePrimaryPanelClick}></div>
        <div className="icon sidepanel-hidden-right" onClick={handleSecondaryPanelClick}></div>
      </header>

      <section className="activitybar"></section>

      <section className="primary-sidepanel">
        <header className="somebar"></header>
        <main className="some-panel"></main>
      </section>

      <section className="control-panel">
        <header className="controlbar"></header>
        <div className="panel-one"></div>
        <div className="panel-two"></div>
      </section>

      <section className="secondary-sidepanel hidden">
        <header className="somebar"></header>
        <main className="some-panel"></main>
      </section>

      <footer className="statusbar"></footer>
    </main>
  );
}


export default Page;
