import React, { useState } from "react";

export default function gpsAttempt() {
  // Upper left corner: 42.935352, -85.590951
  // Lower right corner: 42.928779, -85.584876
  const [pos, setPos] = useState({});


  return {lat: pos.coords.latitude, long: pos.coords.longitude};
}