declare module "react-webcam" {
  import * as React from "react";

  export interface WebcamProps {
    audio?: boolean;
    screenshotFormat?: string;
    className?: string;
    videoConstraints?: MediaTrackConstraints;
   ref?: React.Ref<Webcam>;
  }

  export default class Webcam extends React.Component<WebcamProps> {
    getScreenshot(): string | null;
  }
}
