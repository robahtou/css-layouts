'use client';

import type { MouseEvent } from "react";


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
  let primarySidePanel    :HTMLElement;
  let primaryDragbar      :HTMLElement;
  let secondaryDragbar    :HTMLElement;
  let secondarySidePanel  :HTMLElement;
  let isSwapped = false;
  let offset = 0;

  const onPrimaryMouseDown  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

    primaryDragbar    = document.getElementById('primary-dragbar')    as HTMLElement;
    primarySidePanel  = document.getElementById('primary-sidepanel')  as HTMLElement;

    const primaryDragbarRect    = primaryDragbar.getBoundingClientRect();
    const primarySidePanelRect  = primarySidePanel.getBoundingClientRect();

    if ((primaryDragbarRect.left <= mouseEvent.clientX) && (mouseEvent.clientX <= primaryDragbarRect.right)) {
      offset = isSwapped
        ? primarySidePanelRect.left - mouseEvent.clientX
        : mouseEvent.clientX        - primarySidePanelRect.right
      ;
    }

    document.addEventListener('mousemove', onPrimaryMouseMove);
    document.addEventListener('mouseup', onPrimaryMouseUp);
  };
  const onPrimaryMouseMove  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

    const mainControlPanel    = document.getElementById('main-control-panel') as HTMLElement;
    const primarySidePanelRec = primarySidePanel.getBoundingClientRect()      as DOMRect;
    const mousePositionLeft   = mouseEvent.clientX;

    console.log(isSwapped)
    const newPrimaryWidth     = isSwapped
      ? primarySidePanelRec.right - mousePositionLeft         - offset
      : mousePositionLeft         - primarySidePanelRec.left  - offset;
    console.log(newPrimaryWidth)

    const currentGridTemplate = getComputedStyle(mainControlPanel)['grid-template-columns'].split(' ');
    if (currentGridTemplate.length === 3) {
      if (isSwapped) {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, auto) 4px minmax(20%, ${newPrimaryWidth}px)`;
      } else {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${newPrimaryWidth}px) 4px minmax(20%, auto)`;
      }
    } else {
      if (isSwapped) {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[0]}) 4px minmax(20%, auto) 4px minmax(20%, ${newPrimaryWidth}px)`;
      } else {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${newPrimaryWidth}px) 4px minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[currentGridTemplate.length -1]})`;
      }
    }
  };
  const onPrimaryMouseUp    = () => {
    document.removeEventListener('mousemove', onPrimaryMouseMove);
    document.removeEventListener('mouseup', onPrimaryMouseUp);
    offset = 0;
  };

  const onSecondaryMouseDown  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

    secondaryDragbar    = document.getElementById('secondary-dragbar')    as HTMLElement;
    secondarySidePanel  = document.getElementById('secondary-sidepanel')  as HTMLElement;

    const secondaryDragbarRect    = secondaryDragbar.getBoundingClientRect();
    const secondarySidePanelRect  = secondarySidePanel.getBoundingClientRect();

    if ((secondaryDragbarRect.left <= mouseEvent.clientX) && (mouseEvent.clientX <= secondaryDragbarRect.right)) {
      offset = isSwapped
        ? mouseEvent.clientX          - secondarySidePanelRect.right
        : secondarySidePanelRect.left - mouseEvent.clientX
      ;
    }

    document.addEventListener('mousemove', onSecondaryMouseMove);
    document.addEventListener('mouseup', onSecondaryMouseUp);
  };
  const onSecondaryMouseMove  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

    const mainControlPanel      = document.getElementById('main-control-panel') as HTMLElement;
    const secondarySidePanelRec = secondarySidePanel.getBoundingClientRect()    as DOMRect;
    const mousePositionLeft     = mouseEvent.clientX;

    const newSecondaryWidth = isSwapped
      ? mousePositionLeft           - secondarySidePanelRec.left  - offset
      : secondarySidePanelRec.right - mousePositionLeft           - offset

    const currentGridTemplate = getComputedStyle(mainControlPanel)['grid-template-columns'].split(' ');
    if (isSwapped) {
      mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${newSecondaryWidth}px) 4px minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[currentGridTemplate.length-1]})`;
    } else {
      mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[0]}) 4px minmax(20%, auto) 4px minmax(20%, ${newSecondaryWidth}px)`;
    }
  };
  const onSecondaryMouseUp    = () => {
    document.removeEventListener('mousemove', onSecondaryMouseMove);
    document.removeEventListener('mouseup', onSecondaryMouseUp);
    offset = 0;
  };

  const handlePrimaryPanelClick   = e => {
    const primaryIcon   = e.target;
    const secondaryIcon = e.target.nextElementSibling;

    const mainContainer     = document.getElementById('main-container')     as HTMLElement;
    const mainControlPanel  = document.getElementById('main-control-panel') as HTMLElement;

    const currentPrimaryIcon    = primaryIcon.classList[1];
    const currentSecondaryIcon  = secondaryIcon.classList[1];
    const hasSwapped            = mainContainer.classList[1] || false;

    primaryIcon.classList.replace(currentPrimaryIcon, iconPrimarySwap[currentPrimaryIcon]);
    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryPositionSwap[currentSecondaryIcon]);

    const currentGridTemplate = getComputedStyle(mainControlPanel)['grid-template-columns'].split(' ');
    if (currentGridTemplate.length === 3) {
      if (!hasSwapped) {
        isSwapped = true;
        mainContainer.classList.add('swapped');
        mainControlPanel.style.gridTemplateAreas = `'control-panel primary-dragbar primary-sidepanel'`;
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[0]})`;
      } else {
        isSwapped = false;
        mainContainer.classList.remove('swapped');
        mainControlPanel.style.gridTemplateAreas = `'primary-sidepanel primary-dragbar control-panel'`;
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[2]}) 4px minmax(20%, auto)`;
      }
    } else {
      if (!hasSwapped) {
        isSwapped = true;
        mainContainer.classList.add('swapped');
        mainControlPanel.style.gridTemplateAreas = `'secondary-sidepanel secondary-dragbar control-panel primary-dragbar primary-sidepanel'`;
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[currentGridTemplate.length-1]}) 4px minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[0]})`;
      } else {
        isSwapped = false;
        mainContainer.classList.remove('swapped');
        mainControlPanel.style.gridTemplateAreas = `'primary-sidepanel primary-dragbar control-panel secondary-dragbar secondary-sidepanel'`;
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[0]}) 4px minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[currentGridTemplate.length-1]})`;
      }
    }
  };
  const handleSecondaryPanelClick = e => {
    const secondaryIcon = e.target;
    const currentSecondaryIcon = secondaryIcon.classList[1];

    const mainControlPanel    = document.getElementById('main-control-panel')!;
    const secondaryDragbar    = document.getElementById('secondary-dragbar')!;
    const secondarySidePanel  = document.getElementById('secondary-sidepanel')!;

    const currentSecondarySidePanel = secondarySidePanel.classList[1];

    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryVisibleSwap[currentSecondaryIcon]);
    const currentGridTemplate = getComputedStyle(mainControlPanel)['grid-template-columns'].split(' ');

    if (currentSecondarySidePanel === 'hidden') {
      if (isSwapped) {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, 50%) 4px minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[currentGridTemplate.length-1]})`;
        mainControlPanel.style.gridTemplateAreas = `'secondary-sidepanel secondary-dragbar control-panel primary-dragbar primary-sidepanel'`;
      } else {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[0]}) 4px minmax(20%, auto) 4px minmax(20%, 50%)`;
        mainControlPanel.style.gridTemplateAreas = `'primary-sidepanel primary-dragbar control-panel secondary-dragbar secondary-sidepanel'`;
      }

      secondaryDragbar.classList.remove('hidden');
      secondarySidePanel.classList.remove('hidden');
    } else {
      if (isSwapped) {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, auto) 4px minmax(20%, ${currentGridTemplate[currentGridTemplate.length-1]})`;
        mainControlPanel.style.gridTemplateAreas = `'control-panel primary-dragbar primary-sidepanel'`;

      } else {
        mainControlPanel.style.gridTemplateColumns = `minmax(20%, ${currentGridTemplate[0]}) 4px minmax(20%, auto)`;
        mainControlPanel.style.gridTemplateAreas = `'primary-sidepanel primary-dragbar control-panel'`;
      }

      secondaryDragbar.classList.add('hidden');
      secondarySidePanel.classList.add('hidden');
    }
  };

  return (
    <main className="grid main-layout">

      <header className="titlebar">
        <div className="icon sidepanel-left"          onClick={handlePrimaryPanelClick}   />
        <div className="icon sidepanel-hidden-right"  onClick={handleSecondaryPanelClick} />
      </header>

      <div id="main-container" className="main-container">
        <section className="activitybar" />

        <div id="main-control-panel" className="main-control-panel">
          <section id="primary-sidepanel" className="primary-sidepanel">
            <header className="somebar"></header>
            <main className="some-panel"></main>
          </section>

          <div id="primary-dragbar" className="primary-dragbar" onMouseDown={onPrimaryMouseDown} />

          <section id="control-panel" className="control-panel">
            <header className="controlbar"></header>
            <div className="panel-one"></div>
            <div className="panel-two"></div>
          </section>

          <div id="secondary-dragbar" className="secondary-dragbar hidden" onMouseDown={onSecondaryMouseDown} />

          <section id="secondary-sidepanel" className="secondary-sidepanel hidden">
            <header className="somebar"></header>
            <main className="some-panel"></main>
          </section>
        </div>
      </div>

      <footer className="statusbar"></footer>
    </main>
  );
}


export default Page;
