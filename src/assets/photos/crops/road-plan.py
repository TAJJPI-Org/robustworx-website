import sys, math
R,S=sys.argv[1],sys.argv[2]
W,H=1600,1000
VPX,VPY=860,150
Z0=20; K=(1000-VPY)*Z0
HALF=4.6; PPM0=400/HALF
def y(z): return VPY + K/z
def ppm(z): return PPM0*Z0/z
def x(z, off): return VPX + off*ppm(z)
def pt(z, off): return (x(z,off), y(z))
def poly(points, **kw):
    attrs=' '.join(f'{k.replace("_","-")}="{v}"' for k,v in kw.items())
    return f'<polygon points="{" ".join(f"{a:.1f},{b:.1f}" for a,b in points)}" {attrs}/>'
def line(a,b,**kw):
    attrs=' '.join(f'{k.replace("_","-")}="{v}"' for k,v in kw.items())
    return f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" {attrs}/>'
def text(xx,yy,t,size=16,fill='#f2f2ee',weight=700,family='Barlow Condensed',anchor='start',ls=0):
    return f'<text x="{xx:.1f}" y="{yy:.1f}" font-family="{family}" font-weight="{weight}" font-size="{size:.1f}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}">{t}</text>'
o=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
o.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0c0e"/><stop offset="0.55" stop-color="#2a1a2e"/><stop offset="1" stop-color="#8a3a12"/></linearGradient>
<linearGradient id="paddockL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3320"/><stop offset="1" stop-color="#5a4a22"/></linearGradient>
<linearGradient id="paddockR" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33301f"/><stop offset="1" stop-color="#574a24"/></linearGradient>
<linearGradient id="seal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a42"/><stop offset="1" stop-color="#232329"/></linearGradient>
<linearGradient id="gravel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b5a3c"/><stop offset="1" stop-color="#8a7350"/></linearGradient>
<pattern id="hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="16" fill="#ff6a13" fill-opacity="0.6"/></pattern>
<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb060" stop-opacity="0.9"/><stop offset="1" stop-color="#ff6a13" stop-opacity="0"/></radialGradient>
</defs>''')
o.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
o.append(f'<ellipse cx="{VPX+180}" cy="{VPY-10}" rx="260" ry="120" fill="url(#sun)"/>')
o.append(f'<path d="M0 {VPY+8} C200 {VPY-30} 420 {VPY+20} 640 {VPY-12} S1000 {VPY+18} 1240 {VPY-20} S1500 {VPY+10} 1600 {VPY-6} V{VPY+40} H0 Z" fill="#1b1a20"/>')
o.append(f'<rect x="0" y="{VPY+30}" width="{W}" height="{H-VPY-30}" fill="url(#paddockL)"/>')
o.append(f'<polygon points="{VPX},{VPY+30} {W},{VPY+30} {W},{H} {VPX+400},{H}" fill="url(#paddockR)"/>')
for off in list(range(-70,-6,6))+list(range(7,71,6)):
    a=pt(400, off); b=pt(20.5, off)
    o.append(line(a,b,stroke='#000000',stroke_opacity='0.12',stroke_width='1'))
ZFAR=400
o.append(poly([pt(ZFAR,-HALF-0.1),pt(ZFAR,-HALF-2.8),pt(20.3,-HALF-2.8),pt(20.3,-HALF-0.1)],fill='url(#gravel)'))
o.append(poly([pt(ZFAR,HALF+0.1),pt(ZFAR,HALF+2.8),pt(20.3,HALF+2.8),pt(20.3,HALF+0.1)],fill='url(#gravel)'))
o.append(poly([pt(ZFAR,-HALF),pt(ZFAR,HALF),pt(20.3,HALF),pt(20.3,-HALF)],fill='url(#seal)'))
o.append(line(pt(ZFAR,-HALF+0.15),pt(20.3,-HALF+0.15),stroke='#e8e8e2',stroke_width='3'))
o.append(line(pt(ZFAR,HALF-0.15),pt(20.3,HALF-0.15),stroke='#e8e8e2',stroke_width='3'))
z=20.5
while z<ZFAR:
    o.append(poly([pt(z,-0.1),pt(z,0.1),pt(min(z+3,ZFAR),0.1),pt(min(z+3,ZFAR),-0.1)],fill='#f2f2ee')); z+=12
def post(z, off, h, col, w):
    base=pt(z,off); top=(base[0], base[1]-h*ppm(z))
    return line(base,top,stroke=col,stroke_width=str(max(1,w*Z0/z)))
for z in range(21,ZFAR,4):
    o.append(post(z,-HALF-9,1.2,'#7a6f57',2.5)); o.append(post(z,HALF+9,1.2,'#7a6f57',2.5))
o.append(line(pt(21,-HALF-9),pt(ZFAR-1,-HALF-9),stroke='#7a6f57',stroke_width='1.2'))
o.append(line(pt(21,HALF+9),pt(ZFAR-1,HALF+9),stroke='#7a6f57',stroke_width='1.2'))
for z in range(22,ZFAR,8):
    for side in (-1,1):
        base=pt(z,side*(HALF+2.2)); hpx=1.0*ppm(z); w=max(1.5,3.5*Z0/z)
        o.append(line(base,(base[0],base[1]-hpx),stroke='#f2f2ee',stroke_width=str(w)))
        o.append(line((base[0],base[1]-hpx),(base[0],base[1]-hpx*0.75),stroke='#d4260f',stroke_width=str(w)))
def gum(z, off, s=1.0):
    bx,by=pt(z,off); u=ppm(z)*s
    return (f'<g><line x1="{bx:.1f}" y1="{by:.1f}" x2="{bx+0.3*u:.1f}" y2="{by-5*u:.1f}" stroke="#4a3f33" stroke-width="{max(1.5,0.5*u):.1f}"/>'
            f'<ellipse cx="{bx+0.6*u:.1f}" cy="{by-6.2*u:.1f}" rx="{3.2*u:.1f}" ry="{2.1*u:.1f}" fill="#2f3a24"/>'
            f'<ellipse cx="{bx-1.2*u:.1f}" cy="{by-5.2*u:.1f}" rx="{2.4*u:.1f}" ry="{1.6*u:.1f}" fill="#354328"/>'
            f'<ellipse cx="{bx+2.4*u:.1f}" cy="{by-4.6*u:.1f}" rx="{2.0*u:.1f}" ry="{1.3*u:.1f}" fill="#2b3521"/></g>')
for (z,off,s) in [(260,-34,1),(170,-30,1),(110,-26,1.1),(200,30,1),(130,26,1),(300,-46,1),(85,-30,1),(320,40,1)]:
    o.append(gum(z,off,s))
def cone(z, off):
    bx,by=pt(z,off); u=ppm(z); h=0.7*u; w=0.36*u
    return (f'<polygon points="{bx-w:.1f},{by:.1f} {bx-w*0.35:.1f},{by-h:.1f} {bx+w*0.35:.1f},{by-h:.1f} {bx+w:.1f},{by:.1f}" fill="#ff6a13"/>'
            f'<rect x="{bx-w*0.7:.1f}" y="{by-h*0.62:.1f}" width="{w*1.4:.1f}" height="{h*0.16:.1f}" fill="#f2f2ee"/>'
            f'<rect x="{bx-w*1.2:.1f}" y="{by-h*0.06:.1f}" width="{w*2.4:.1f}" height="{h*0.1:.1f}" fill="#ff6a13"/>')
def sign_diamond(z, off, lines, size_m=1.2, post_m=1.6, fill='#ff6a13'):
    bx,by=pt(z,off); u=ppm(z); half=size_m*u/2; cy=by-post_m*u-half; fs=max(6, size_m*u*0.19)
    t=''.join(text(bx, cy+(i-(len(lines)-1)/2)*fs*1.05+fs*0.35, l, size=fs, fill='#0c0c0e', anchor='middle') for i,l in enumerate(lines))
    return (f'<line x1="{bx:.1f}" y1="{by:.1f}" x2="{bx:.1f}" y2="{cy:.1f}" stroke="#a3a3a0" stroke-width="{max(1.5,0.12*u):.1f}"/>'
            f'<polygon points="{bx:.1f},{cy-half:.1f} {bx+half:.1f},{cy:.1f} {bx:.1f},{cy+half:.1f} {bx-half:.1f},{cy:.1f}" fill="{fill}" stroke="#0c0c0e" stroke-width="{max(1,0.05*u):.1f}"/>'+t)
def sign_speed(z, off, n, size_m=0.9, post_m=1.6):
    bx,by=pt(z,off); u=ppm(z); r=size_m*u/2; cy=by-post_m*u-r
    return (f'<line x1="{bx:.1f}" y1="{by:.1f}" x2="{bx:.1f}" y2="{cy:.1f}" stroke="#a3a3a0" stroke-width="{max(1.5,0.12*u):.1f}"/>'
            f'<circle cx="{bx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="#f2f2ee" stroke="#d4260f" stroke-width="{max(1.5,r*0.22):.1f}"/>'
            +text(bx, cy+r*0.38, n, size=max(6,r*1.05), fill='#0c0c0e', anchor='middle'))
def sign_rect(z, off, lines, w_m=1.5, h_m=0.7, post_m=1.6, fill='#ff6a13'):
    bx,by=pt(z,off); u=ppm(z); w=w_m*u; h=h_m*u; top=by-post_m*u-h; fs=max(6,h*0.42)
    t=''.join(text(bx, top+h/2+(i-(len(lines)-1)/2)*fs*1.05+fs*0.35, l, size=fs, fill='#0c0c0e', anchor='middle') for i,l in enumerate(lines))
    return (f'<line x1="{bx:.1f}" y1="{by:.1f}" x2="{bx:.1f}" y2="{top+h:.1f}" stroke="#a3a3a0" stroke-width="{max(1.5,0.12*u):.1f}"/>'
            f'<rect x="{bx-w/2:.1f}" y="{top:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}" stroke="#0c0c0e" stroke-width="{max(1,0.05*u):.1f}"/>'+t)
def controller(z, off):
    bx,by=pt(z,off); u=ppm(z)
    return (f'<rect x="{bx-0.28*u:.1f}" y="{by-1.35*u:.1f}" width="{0.56*u:.1f}" height="{0.8*u:.1f}" rx="{0.08*u:.1f}" fill="#c6f000"/>'
            f'<rect x="{bx-0.28*u:.1f}" y="{by-1.0*u:.1f}" width="{0.56*u:.1f}" height="{0.12*u:.1f}" fill="#8b8b89"/>'
            f'<rect x="{bx-0.26*u:.1f}" y="{by-0.55*u:.1f}" width="{0.22*u:.1f}" height="{0.55*u:.1f}" fill="#1d2a4a"/><rect x="{bx+0.04*u:.1f}" y="{by-0.55*u:.1f}" width="{0.22*u:.1f}" height="{0.55*u:.1f}" fill="#1d2a4a"/>'
            f'<circle cx="{bx:.1f}" cy="{by-1.55*u:.1f}" r="{0.2*u:.1f}" fill="#f2f2ee"/>'
            f'<line x1="{bx+0.3*u:.1f}" y1="{by-1.0*u:.1f}" x2="{bx+0.55*u:.1f}" y2="{by-2.1*u:.1f}" stroke="#8b8b89" stroke-width="{max(1.5,0.07*u):.1f}"/>'
            f'<circle cx="{bx+0.55*u:.1f}" cy="{by-2.35*u:.1f}" r="{0.3*u:.1f}" fill="#d4260f" stroke="#f2f2ee" stroke-width="{max(1,0.05*u):.1f}"/>'
            +text(bx+0.55*u, by-2.35*u+0.11*u, 'STOP', size=max(5,0.28*u), fill='#f2f2ee', anchor='middle'))
def ute(z, off):
    u=ppm(z); u2=ppm(z+5)
    x1,y1=pt(z,off-1.0); x2,_=pt(z,off+1.0); x3,y3=pt(z+5,off+1.0); x4,_=pt(z+5,off-1.0)
    h=1.4*u; h2=1.4*u2
    return (f'<polygon points="{x1:.1f},{y1-h:.1f} {x2:.1f},{y1-h:.1f} {x3:.1f},{y3-h2:.1f} {x4:.1f},{y3-h2:.1f}" fill="#f2f2ee" stroke="#0c0c0e" stroke-width="1"/>'
            f'<polygon points="{x1:.1f},{y1:.1f} {x2:.1f},{y1:.1f} {x2:.1f},{y1-h:.1f} {x1:.1f},{y1-h:.1f}" fill="#e6e6e0" stroke="#0c0c0e" stroke-width="1"/>'
            f'<rect x="{x1+0.15*u:.1f}" y="{y1-h*0.85:.1f}" width="{(x2-x1)*0.7:.1f}" height="{h*0.35:.1f}" fill="#ff6a13"/>'
            f'<rect x="{x1+0.15*u:.1f}" y="{y1-h*0.45:.1f}" width="{(x2-x1)*0.7:.1f}" height="{h*0.12:.1f}" fill="#7b2fd1"/>'
            f'<rect x="{x1:.1f}" y="{y1-h*0.12:.1f}" width="{(x2-x1)*0.18:.1f}" height="{h*0.12:.1f}" fill="#0c0c0e"/><rect x="{x2-(x2-x1)*0.18:.1f}" y="{y1-h*0.12:.1f}" width="{(x2-x1)*0.18:.1f}" height="{h*0.12:.1f}" fill="#0c0c0e"/>')
def excavator(z, off):
    u=ppm(z); bx,by=pt(z,off); w=2.4*u; h=1.6*u
    return (f'<rect x="{bx-w/2:.1f}" y="{by-h*0.35:.1f}" width="{w:.1f}" height="{h*0.35:.1f}" fill="#2b2b30" stroke="#0c0c0e"/>'
            f'<rect x="{bx-w*0.42:.1f}" y="{by-h:.1f}" width="{w*0.84:.1f}" height="{h*0.68:.1f}" rx="{0.1*u:.1f}" fill="#e8b400" stroke="#0c0c0e"/>'
            f'<rect x="{bx-w*0.38:.1f}" y="{by-h*0.95:.1f}" width="{w*0.32:.1f}" height="{h*0.4:.1f}" fill="#1b2a3a"/>'
            f'<path d="M{bx+w*0.2:.1f} {by-h*0.8:.1f} L{bx+w*0.75:.1f} {by-h*1.7:.1f} L{bx+w*1.15:.1f} {by-h*0.9:.1f}" fill="none" stroke="#e8b400" stroke-width="{max(2,0.22*u):.1f}" stroke-linecap="round"/>'
            f'<polygon points="{bx+w*1.05:.1f},{by-h*0.95:.1f} {bx+w*1.3:.1f},{by-h*0.95:.1f} {bx+w*1.25:.1f},{by-h*0.5:.1f} {bx+w*0.98:.1f},{by-h*0.55:.1f}" fill="#7a7a7a" stroke="#0c0c0e"/>')
def barrier(z, off_a, off_b):
    ax,ay=pt(z,off_a); bx_,by_=pt(z,off_b); u=ppm(z); h=0.9*u
    return (f'<line x1="{ax:.1f}" y1="{ay:.1f}" x2="{ax:.1f}" y2="{ay-h:.1f}" stroke="#f2f2ee" stroke-width="{max(1.5,0.08*u):.1f}"/>'
            f'<line x1="{bx_:.1f}" y1="{by_:.1f}" x2="{bx_:.1f}" y2="{by_-h:.1f}" stroke="#f2f2ee" stroke-width="{max(1.5,0.08*u):.1f}"/>'
            f'<rect x="{min(ax,bx_):.1f}" y="{ay-h*0.9:.1f}" width="{abs(bx_-ax):.1f}" height="{h*0.32:.1f}" fill="#ff6a13" fill-opacity="0.4" stroke="#ff6a13" stroke-width="1"/>'
            f'<rect x="{min(ax,bx_):.1f}" y="{ay-h*0.9:.1f}" width="{abs(bx_-ax):.1f}" height="{h*0.32:.1f}" fill="url(#hatch)"/>')
ZA=(20.5,37); ZT=(37,47); ZB=(47,51.5); ZW=(51.5,70); ZE=(70,80)
o.append(poly([pt(ZW[0],-HALF+0.3),pt(ZW[0],-0.3),pt(ZW[1],-0.3),pt(ZW[1],-HALF+0.3)],fill='url(#hatch)'))
o.append(poly([pt(ZB[0],-HALF+0.3),pt(ZB[0],-0.3),pt(ZB[1],-0.3),pt(ZB[1],-HALF+0.3)],fill='none',stroke='#c6f000',stroke_width='1.5',stroke_dasharray='6 5'))
# far things first (painter's order): far signs, then plant, then near cones/signs
o.append(sign_diamond(200, HALF+1.6, ['ROAD','WORK','AHEAD'], 1.0, 1.4))
o.append(sign_speed(170, HALF+1.6, '40', 0.8, 1.4))
o.append(sign_speed(ZE[1]+8, -HALF-1.6, '100', 0.9, 1.5))
o.append(sign_rect(ZE[1], -HALF-1.6, ['END','ROAD WORK'], 1.5, 0.75, 1.5))
o.append(ute(63,-2.6)); o.append(excavator(56,-2.4))
o.append(barrier(ZW[0],-HALF+0.4,-0.6))
for i in range(5):
    t=i/4; zc=ZW[1]+t*5; off=-0.5+t*((-HALF+0.4)-(-0.5)); o.append(cone(zc,off))
zc=ZW[1]-1
while zc>ZB[0]:
    o.append(cone(zc,-0.5)); zc-=2.4
n=9
for i in reversed(range(n)):
    t=i/(n-1); zc=ZT[0]+t*(ZT[1]-ZT[0]); off=(-HALF+0.4)+t*((-0.5)-(-HALF+0.4)); o.append(cone(zc,off))
o.append(controller(38.5, -HALF+1.1))
o.append(sign_speed(36, -HALF-1.9, '40', 0.95, 1.7))
o.append(sign_diamond(31, -HALF-1.9, ['PREPARE','TO STOP'], 1.2, 1.7))
o.append(sign_speed(26.5, -HALF-1.9, '80', 0.95, 1.7))
o.append(sign_diamond(22.5, -HALF-1.9, ['ROAD','WORK','AHEAD'], 1.2, 1.7))
def arrow(z, off, up=True):
    a=pt(z,off); b=pt(z+5,off); u=ppm(z+2.5); tip = b if up else a; tail = a if up else b; d = -1 if up else 1
    return (line(tail,tip,stroke='#e8e8e2',stroke_width=str(max(2,0.16*u)))+
            f'<polygon points="{tip[0]:.1f},{tip[1]:.1f} {tip[0]-0.45*u:.1f},{tip[1]-d*0.9*u:.1f} {tip[0]+0.45*u:.1f},{tip[1]-d*0.9*u:.1f}" fill="#e8e8e2"/>')
o.append(arrow(23,-2.4,True)); o.append(arrow(23,2.4,False))
# left panel
o.append('<rect x="40" y="40" width="400" height="600" fill="#0c0c0e" fill-opacity="0.86"/>')
o.append('<rect x="40" y="40" width="400" height="6" fill="#c6f000"/>')
o.append(text(70,92,'ROBUSTWORX · FIELD DRAWING',size=15,fill='#c6f000',ls=4))
o.append(text(70,150,'TRAFFIC',size=64)); o.append(text(70,210,'CONTROL',size=64)); o.append(text(70,270,'PLAN',size=64,fill='#c6f000'))
o.append(text(70,306,'RURAL MAJOR ROAD · SINGLE-LANE CLOSURE',size=15,fill='#ff6a13',ls=2))
for i,l in enumerate(['Sealed two-lane road, gravel shoulders, 100 km/h open','limit. Left lane closed for the work area; traffic','alternates through the right lane under stop/slow.']):
    o.append(text(70,338+i*22,l,size=16,fill='#d5d5cf',weight=500,family='Barlow'))
items=[('01','Advance warning','Road work ahead · 80 · prepare to stop · 40'),('02','Transition','Cone taper from shoulder to centre line'),('03','Buffer','Clear space before the work area'),('04','Activity space','Coned work area with plant and ute'),('05','Termination','Exit taper · end road work · 100 restored')]
yy=430
for no,tt,dd in items:
    o.append(text(70,yy,no,size=13,fill='#ff6a13',ls=2)); o.append(text(102,yy,tt.upper(),size=18,fill='#f2f2ee',ls=1))
    o.append(text(102,yy+18,dd,size=13,fill='#a3a3a0',weight=500,family='Barlow')); yy+=40
# right callouts on fixed rows
def callout(z, label, sub, ly):
    ax,ay=pt(z,HALF+3.0); lx=1268
    return (line((ax,ay),(lx-10,ly),stroke='#c6f000',stroke_width='1.5')+f'<circle cx="{ax:.1f}" cy="{ay:.1f}" r="4" fill="#c6f000"/>'
            +f'<rect x="{lx-6}" y="{ly-26}" width="312" height="52" fill="#0c0c0e" fill-opacity="0.86"/><rect x="{lx-6}" y="{ly-26}" width="4" height="52" fill="#c6f000"/>'
            +text(lx+10,ly-4,label,size=20,ls=1)+text(lx+10,ly+15,sub,size=12,fill='#a3a3a0',weight=500,family='Barlow'))
o.append(callout(75,'TERMINATION SPACE','Exit taper · end road work · speed restored',250))
o.append(callout(60,'ACTIVITY SPACE','Coned left lane · plant, ute and crew inside',340))
o.append(callout(49,'BUFFER SPACE','Clear zone between the taper and the work',430))
o.append(callout(42,'TRANSITION SPACE','Cone taper · traffic controller · stop/slow',520))
o.append(callout(28,'ADVANCE WARNING SPACE','Road work ahead · 80 · prepare to stop · 40',660))
o.append(f'<rect x="0" y="{H-10}" width="{W}" height="10" fill="#ff6a13"/>')
o.append('<rect x="40" y="920" width="1520" height="46" fill="#0c0c0e" fill-opacity="0.82"/>')
o.append(text(60,949,'ILLUSTRATIVE ONLY · NOT A TRAFFIC GUIDANCE SCHEME · NOT TO SCALE · SIGN SPACING, SPEEDS AND CONTROLS ARE SET PER JOB BY THE RESPONSIBLE PARTY',size=14,fill='#c6c6c1',ls=2))
o.append(text(1540,949,'RURAL SA',size=14,fill='#c6f000',ls=3,anchor='end'))
o.append('</svg>')
open(f'{S}/tcp-rural.svg','w').write('\n'.join(o))
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:'Barlow Condensed';font-weight:700;src:url('file://{R}/node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2') format('woff2')}}
@font-face{{font-family:'Barlow';font-weight:500;src:url('file://{R}/node_modules/@fontsource/barlow/files/barlow-latin-500-normal.woff2') format('woff2')}}
*{{margin:0}}body{{width:{W}px;height:{H}px;overflow:hidden;background:#0c0c0e}}</style></head><body>{open(f'{S}/tcp-rural.svg').read()}</body></html>'''
open(f'{S}/tcp-rural.html','w').write(html); print('svg ok')
