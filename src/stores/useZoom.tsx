import { create } from 'zustand';
import { GetState, SetState } from './store.interface';

interface IZoomStore {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
}

const DEFAULT_ZOOM = 0.9;
const MAX_ZOOM = 1.5;
const MIN_ZOOM = 0.9;
const ZOOM_STEP = 1.1;

const handleZoomIn = (get: GetState<IZoomStore>) => () => get().setZoom(get().zoom * ZOOM_STEP);

const handleZoomOut = (get: GetState<IZoomStore>) => () => get().setZoom(get().zoom / ZOOM_STEP);

const handleSetZoom = (set: SetState<IZoomStore>) => (zoom: number) =>
  set(() => ({
    zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +zoom.toFixed(1))),
  }));

const handleResetZoom = (set: SetState<IZoomStore>) => () => set(() => ({ zoom: DEFAULT_ZOOM }));

interface ZoomState {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setInitialZoom: () => void;
}

export const useZoom = create<ZoomState>((set) => ({
  zoom: 1,
  zoomIn: () => set((state) => ({ zoom: state.zoom + 0.1 })),
  zoomOut: () => set((state) => ({ zoom: Math.max(0.1, state.zoom - 0.1) })),
  resetZoom: () => {
    const width = window.innerWidth;
    const initialZoom = width < 768 ? 0.6 : 0.8;
    set({ zoom: initialZoom });
  },
  setInitialZoom: () => {
    const width = window.innerWidth;
    const initialZoom = width < 768 ? 0.4 : 0.8;
    set({ zoom: initialZoom });
  },
}));
