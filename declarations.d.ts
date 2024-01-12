declare module '*.mp3' {
    const src: string;
    export default src;
  }
  

  declare module 'use-sound' {
    // You can define a basic structure for what you expect from use-sound
    // For example, if you are using it as a hook:
    export default function useSound(
      path: string,
      options?: any
    ): [() => void, { stop: () => void; isPlaying: boolean; }];
  }
  