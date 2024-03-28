'use client';

import React, { useState, useRef, useEffect, MouseEvent } from "react";


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
  let mainControlPanel    :HTMLElement;
  let primarySidePanel    :HTMLElement;
  let primaryDragbar      :HTMLElement;
  let secondaryDragbar    :HTMLElement;
  let secondarySidePanel  :HTMLElement;
  let isSwapped = false;
  let offset = 0;

  useEffect(() => {
    mainControlPanel    = document.querySelector('#main-control-panel') as HTMLElement;
    primaryDragbar      = mainControlPanel.querySelector('.primary-dragbar') as HTMLElement;
    primarySidePanel    = mainControlPanel.querySelector('.primary-sidepanel') as HTMLElement;
    secondaryDragbar    = mainControlPanel.querySelector('.secondary-dragbar') as HTMLElement;
    secondarySidePanel  = mainControlPanel.querySelector('.secondary-sidepanel') as HTMLElement;
  }, []);

  const onPrimaryMouseDown  = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

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

    const primarySidePanelRec = primarySidePanel.getBoundingClientRect() as DOMRect;
    const mousePositionLeft   = mouseEvent.clientX;

    const newPrimaryWidth = isSwapped
      ? primarySidePanelRec.right - mousePositionLeft         - offset
      : mousePositionLeft         - primarySidePanelRec.left  - offset;

    primarySidePanel.style.flexBasis = `${Math.max(0, newPrimaryWidth)}px`;
  };
  const onPrimaryMouseUp    = () => {
    document.removeEventListener('mousemove', onPrimaryMouseMove);
    document.removeEventListener('mouseup', onPrimaryMouseUp);
    offset = 0;
  };

  const onSecondaryMouseDown  = (mouseEvent: MouseEvent) => {
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

    const secondarySidePanelRec = secondarySidePanel.getBoundingClientRect() as DOMRect;
    const mousePositionLeft     = mouseEvent.clientX;

    const newSecondaryWidth = isSwapped
      ? mousePositionLeft           - secondarySidePanelRec.left  - offset
      : secondarySidePanelRec.right - mousePositionLeft           - offset

    secondarySidePanel.style.flexBasis = `${Math.max(0, newSecondaryWidth)}px`;
  };
  const onSecondaryMouseUp    = () => {
    document.removeEventListener('mousemove', onSecondaryMouseMove);
    document.removeEventListener('mouseup', onSecondaryMouseUp);
    offset = 0;
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
      isSwapped = true;
      mainContainer.classList.add('swapped')
    } else {
      isSwapped = false;
      mainContainer.classList.remove('swapped');
    }
  };
  const handleSecondaryPanelClick = e => {
    const secondaryIcon = e.target;
    const currentSecondaryIcon = secondaryIcon.classList[1];
    const currentSecondarySidePanel = secondarySidePanel.classList[1];

    secondaryIcon.classList.replace(currentSecondaryIcon, iconSecondaryVisibleSwap[currentSecondaryIcon]);

    if (currentSecondarySidePanel === 'hidden') {
      secondarySidePanel.classList.remove('hidden')
    } else {
      secondarySidePanel.classList.add('hidden');
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
