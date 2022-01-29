// @ts-nocheck
import React, { useEffect, useState } from "react";
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import SingleSearch from "@trimblemaps/trimblemaps-singlesearch";

TrimbleMaps.APIKey = "1D173DB111F3D2408D3F53337D404F3F";

const EventModal = ({ onClose, eventData = {} }) => {
  const [event, setEventData] = useState(eventData);

  const onChange = (e) => {
    const updatedEvent = event;
    const id = e.target.id;
    if (id != "allDay") {
      updatedEvent[id] = e.target.value;
    } else {
      updatedEvent[id] = e.target.checked;
    }
    setEventData({...updatedEvent});
  };

  const saveLocation = (location) => {
    setEventData({ ...event, location });
  };

  useEffect(() => {
    let map = new TrimbleMaps.Map({
      container: "map",
      zoom: 12.5,
      center: event.location
        ? new TrimbleMaps.LngLat(
            event.location.Coords.Lat,
            event.location.Coords.Lon
          )
        : new TrimbleMaps.LngLat(-77.01866, 38.888),
    });

    let ctrl = new SingleSearch({
      placeholderText: "Search here",
      doneTypingInterval: 700,
      hideResults: true,
      minSearchTextLength: 3,
      locationRelevance: "mapCenter",
      searchOption: {
        region: TrimbleMaps.Common.Region.WW,
        maxResults: 10,
      },
      markerStyle: {
        graphicHeight: 26,
        graphicWidth: 26,
        graphicXOffset: -13,
        graphicYOffset: -13,
      },
      markerConfig: {
        exclusive: true,
        centerOnMap: true,
        zoomLevel: 12,
      },
      popupConfig: {
        offset: 15,
        show: true,
        className: "single-search",
        closeBox: true,
      },
      // Include other optional customization options
    });
    
    ctrl.on("locationselected", (evt) => {
      // The `location` property of the event contains the location data of the
      // search result selected by the user.
      console.log(evt.location);
      saveLocation(evt.location);
    });
    map.addControl(ctrl, "top-left");
    if(event.location) {
        var marker = new TrimbleMaps.Marker()
          .setLngLat([event.location.Coords.Lat, event.location.Coords.Lon])
          .addTo(map);
          var markerHeight = 35,
            markerRadius = 10,
            linearOffset = 15;
          var popupOffsets = {
            top: [0, 0],
            "top-left": [0, 0],
            "top-right": [0, 0],
            bottom: [0, -markerHeight],
            "bottom-left": [
              linearOffset,
              (markerHeight - markerRadius + linearOffset) * -1,
            ],
            "bottom-right": [
              -linearOffset,
              (markerHeight - markerRadius + linearOffset) * -1,
            ],
            left: [markerRadius, (markerHeight - markerRadius) * -1],
            right: [-markerRadius, (markerHeight - markerRadius) * -1],
          };
          var popup = new TrimbleMaps.Popup({ offset: popupOffsets })
            .setLngLat([event.location.Coords.Lat, event.location.Coords.Lon])
            .setHTML(`<span>${event.location.ShortString}</span>`)
            .setMaxWidth("300px")
            .addTo(map);
    }

    return (() => {
      map = null;
      ctrl = null;
    })
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Event Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                id="title"
                type="text"
                placeholder="Event Title"
                value={event.title}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">From</label>
                <div className="control">
                  <input
                    id="from"
                    className="input"
                    type="date"
                    placeholder="From"
                    value={event.from}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">To</label>
                <div className="control">
                  <input
                    id="to"
                    className="input"
                    type="date"
                    placeholder="To"
                    value={event.to}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Start time</label>
                <div className="control">
                  <input
                    id="startTime"
                    className="input"
                    type="time"
                    placeholder="Start time"
                    value={event.startTime}
                    onChange={onChange}
                    disabled={event.allDay}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">End time</label>
                <div className="control">
                  <input
                    id="endTime"
                    className="input"
                    type="time"
                    placeholder="End time"
                    value={event.endTime}
                    onChange={onChange}
                    disabled={event.allDay}
                  />
                </div>
              </div>
            </div>
            <div className="column" style={{ alignSelf: "center" }}>
              <div className="field">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    id="allDay"
                    value={event.allDay}
                    onChange={onChange}
                  />
                  All day
                </label>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Color</label>
                <div className="select is-primary">
                  <select id="color" onChange={onChange} value={event.color}>
                    <option value="">Select</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="grey">Grey</option>
                    <option value="voilet">Voilet</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <div id="map" style={{ width: "100%", height: "200px" }}></div>
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                rows={2}
                id="description"
                className="textarea"
                placeholder="Description"
                value={event.description}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={() => onClose(event)}>
            Save
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EventModal;
