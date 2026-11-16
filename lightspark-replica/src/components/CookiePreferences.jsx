import { React } from '../lib/runtime.js';

/** Local replacement for the original third-party cookie SDK. */
export default function CookiePreferences() {
  const [open, setOpen] = React.useState(false);
  const dialog = React.useRef(null);
  React.useEffect(() => {
    const previous = window.Osano;
    window.Osano = { cm: { showDrawer: () => setOpen(true), showDialog: () => setOpen(true) } };
    return () => { window.Osano = previous; };
  }, []);
  React.useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);
  if (!open) return null;
  return (
    <dialog ref={dialog} aria-labelledby="preferences-title" onClose={() => setOpen(false)}
      onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}
      style={{border:0,borderRadius:16,padding:32,maxWidth:420,color:'#191919',background:'#f7f7f5',fontFamily:'inherit'}}>
      <form method="dialog">
        <h2 id="preferences-title" style={{fontSize:24,margin:'0 0 16px',fontWeight:450}}>Cookie preferences</h2>
        <p style={{fontSize:16,lineHeight:1.5,margin:'0 0 24px'}}>This replica uses essential local storage only. Analytics and advertising trackers are disabled.</p>
        <button style={{border:0,borderRadius:6,background:'#191919',color:'white',padding:'10px 20px',font:'inherit',cursor:'pointer'}}>Done</button>
      </form>
    </dialog>
  );
}
