'use client';

import React, { useState, useRef, useEffect } from "react";


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
  let primaryDragbar;
  let mainControlPanel;
  let primarySidePanel;
  let isHandlerDragging = false;

  useEffect(() => {
    primaryDragbar = document.querySelector('.primary-dragbar')!;
    mainControlPanel = primaryDragbar.closest('.main-control-panel')!;
    primarySidePanel = mainControlPanel.querySelector('.primary-sidepanel')!;
  }, []);

  const onPrimaryMouseDown  = (evt) => {
    evt.preventDefault();
    document.addEventListener('mousemove', onPrimaryMouseMove);
    document.addEventListener('mouseup', onPrimaryMouseUp);
  };
  const onPrimaryMouseMove  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();
    // Get offset
    var containerOffsetLeft = mainControlPanel.offsetLeft;

    // Get x-coordinate of pointer relative to container
    var pointerRelativeXpos = mouseEvent.clientX - containerOffsetLeft;

    // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
    var boxAminWidth = 60;

    // Resize box A
    // * 8px is the left/right spacing between .handler and its inner pseudo-element
    // * Set flex-grow to 0 to prevent it from growing
    primarySidePanel.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
    primarySidePanel.style.flexGrow = 0;
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
          <section className="primary-sidepanel">
            <header className="somebar"></header>
            <main className="some-panel"></main>
          </section>

          <div className="primary-dragbar" onMouseDown={onPrimaryMouseDown} />

          <section className="control-panel">
            <header className="controlbar"></header>
            <div className="panel-one"></div>
            <div className="panel-two"></div>
          </section>

          <div className="secondary-dragbar" onMouseDown={onSecondaryMouseDown} />

          <section className="secondary-sidepanel hidden">
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
