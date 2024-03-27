'use client';

import React, { useState, useRef } from "react";


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

function Page({ initialPrimaryColimnWidth=32, initialSecondaryColumnWidth=0 }) {
  const [primaryColumnWidth, setPrimaryColumnWidth]     = useState(initialPrimaryColimnWidth);      // primary sidepanel width
  const [secondaryColumnWidth, setSecondaryColumnWidth] = useState(initialSecondaryColumnWidth);    // secondary sidepanel width
  const [isSwapped, setIsSwapped]                       = useState(false);                          // swapped layout

  const primaryRef          = useRef(null);
  const primaryDragbarRef   = useRef(null);
  const controlRef          = useRef(null);
  const secondaryDragbarRef = useRef(null);
  const secondaryRef        = useRef(null);

  const onPrimaryMouseDown  = (evt) => {
    evt.preventDefault();
    document.addEventListener('mousemove', onPrimaryMouseMove);
    document.addEventListener('mouseup', onPrimaryMouseUp);
  };
  const onPrimaryMouseMove  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();
    if (!primaryRef.current || !controlRef.current || !secondaryRef.current) return;

    const primaryRect = primaryRef.current.getBoundingClientRect();
    const controlRect = controlRef.current.getBoundingClientRect();
    const secondaryRect = secondaryRef.current.getBoundingClientRect();

    const boundingWidth = primaryRect.width + controlRect.width + secondaryRect.width;

    const mousePositionLeft   = mouseEvent.clientX;
    const primaryPositionLeft = primaryRect.left;
    const primaryPositionRight  = primaryRect.right;

    let newPrimaryWidth = mousePositionLeft - primaryPositionLeft;
    if (isSwapped) {
      newPrimaryWidth = primaryPositionRight - mousePositionLeft;
    }

    const newPrimaryWidth_percentage = (newPrimaryWidth / boundingWidth) * 100;
    setPrimaryColumnWidth(Math.min(100, Math.max(0, newPrimaryWidth_percentage)));
  };
  const onPrimaryMouseUp    = () => {
    document.removeEventListener('mousemove', onPrimaryMouseMove);
    document.removeEventListener('mouseup', onPrimaryMouseUp);
  };

  const onSecondaryMouseDown  = (evt) => {
    evt.preventDefault();
    document.addEventListener('mousemove', onSecondaryMouseMove);
    document.addEventListener('mouseup', onSecondaryMouseUp);
  };
  const onSecondaryMouseMove  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();
    if (!primaryRef.current || !controlRef.current || !secondaryRef.current) return;

    const primaryRect = primaryRef.current.getBoundingClientRect();
    const controlRect = controlRef.current.getBoundingClientRect();
    const secondaryRect = secondaryRef.current.getBoundingClientRect();

    const boundingWidth = primaryRect.width + controlRect.width + secondaryRect.width;

    const mousePositionLeft     = mouseEvent.clientX;
    const controlPositionLeft   = controlRect.left;
    const controlPositionRight  = controlRect.right;
    const currentControlWidth   = controlRect.width;
    const currentSecondaryWidth = secondaryRect.width;

    let newControlWidth = mousePositionLeft - controlPositionLeft;
    let delta = newControlWidth - currentControlWidth;
    let newSecondaryWidth = currentSecondaryWidth - delta;
    if (isSwapped) {
      newControlWidth = controlPositionRight - mousePositionLeft;
      delta = newControlWidth - currentControlWidth;
      newSecondaryWidth = currentSecondaryWidth - delta;
    }

    const newSecondaryWidth_percentage = (newSecondaryWidth / boundingWidth) * 100;
    setSecondaryColumnWidth(Math.min(100, Math.max(0, newSecondaryWidth_percentage)));
  };
  const onSecondaryMouseUp    = () => {
    document.removeEventListener('mousemove', onSecondaryMouseMove);
    document.removeEventListener('mouseup', onSecondaryMouseUp);
  };

  const handlePrimaryPanelClick   = e => {
    const primaryIcon = e.target;
    const secondaryIcon = e.target.nextElementSibling;
    const mainContainer = document.getElementById('main-container');

    const currentPrimaryIcon = primaryIcon.classList[1];
    const currentSecondaryIcon = secondaryIcon.classList[1];
    const hasSwapped = mainContainer.classList[1];

    primaryIcon.classList.replace(currentPrimaryIcon, iconPrimarySwap[currentPrimaryIcon]);
    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryPositionSwap[currentSecondaryIcon]);

    if (!hasSwapped) {
      setIsSwapped(true);
      mainContainer.classList.add('swapped')
    } else {
      setIsSwapped(false);
      mainContainer.classList.remove('swapped');
    }
  };
  const handleSecondaryPanelClick = e => {
    const secondaryIcon = e.target;
    const secondarySidePanel = document.querySelector('.secondary-sidepanel');
    const currentSecondaryIcon = secondaryIcon.classList[1];
    const currentSecondarySidePanel = secondarySidePanel.classList[1];

    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryVisibleSwap[currentSecondaryIcon]);

    if (currentSecondarySidePanel === 'hidden') {
      secondarySidePanel?.classList.remove('hidden')
      setSecondaryColumnWidth(32);
    } else {
      secondarySidePanel?.classList.add('hidden');
      setSecondaryColumnWidth(0);
    }
  };

  return (
    <main className="grid main-layout">

      <header className="titlebar">
        <div className="icon sidepanel-left" onClick={handlePrimaryPanelClick}></div>
        <div className="icon sidepanel-hidden-right" onClick={handleSecondaryPanelClick}></div>
      </header>

      <div id="main-container" className="main-container">
        <section className="activitybar"></section>

        <div id="main-control-panel" className="main-control-panel">
          <section className="primary-sidepanel" style={{ width: `${primaryColumnWidth}%` }} ref={primaryRef}>
            <header className="somebar"></header>
            <main className="some-panel"></main>
          </section>

          <div className="primary-dragbar"
            ref={primaryDragbarRef}
            onMouseDown={onPrimaryMouseDown}
          />

          <section className="control-panel" style={{ width: `${100 - primaryColumnWidth - secondaryColumnWidth}%` }}
            ref={controlRef}
          >
            <header className="controlbar"></header>
            <div className="panel-one"></div>
            <div className="panel-two"></div>
          </section>

          <div className="secondary-dragbar"
            ref={secondaryDragbarRef}
            onMouseDown={onSecondaryMouseDown}
          />

          <section className="secondary-sidepanel hidden" style={{ width: `${secondaryColumnWidth}%` }} ref={secondaryRef}>
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
