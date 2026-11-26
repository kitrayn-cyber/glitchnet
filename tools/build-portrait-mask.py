"""Build the editable, pixel-aligned selection map for the approved portrait.

Channels: red = hair, green = skin, blue = iris. Rebuild only when the source
art changes; the renderer consumes the resulting image, not these heuristics.
"""
from PIL import Image, ImageDraw
from pathlib import Path
p=Path('assets/avatar/art')
s=Image.open(p/'portrait-open.png').convert('RGBA').resize((320,320),Image.Resampling.NEAREST)
g=Image.open(p/'portrait-hair-mask.png').convert('RGBA').resize((320,320),Image.Resampling.NEAREST)
out=Image.new('RGBA',(320,320),(0,0,0,255)); a=s.load(); b=g.load(); m=out.load()
for y in range(320):
 for x in range(320):
  r,gg,bl,alpha=a[x,y]; gr,gb,gl,ga=b[x,y]
  # Fine strand edges in the reference are translucent. Reject warm skin hues.
  pink=r>45 and r>gg*1.12 and bl>=gg and r>bl*1.02
  supported=ga>=4
  if not supported and ga>=12:
   for dy in range(-2,3):
    for dx in range(-2,3):
     xx=x+dx; yy=y+dy
     if 0<=xx<320 and 0<=yy<320:
      q=b[xx,yy]
      if q[3]>=200 and abs(r-q[0])<100 and abs(gg-q[1])<100 and abs(bl-q[2])<100:
       supported=True;break
    if supported:break
  hair=pink and supported
  # Hand-audited skin boundaries: the warm, rose-tinted shadow along the
  # outside of the left shoulder is not hair, despite the overlapping guide.
  shoulder_edge=(48<=x<=75 and 215<=y<=270 and r>125 and -20<=bl-gg<12)
  if shoulder_edge: hair=False
  skin=(25<=x<295 and 55<=y<315 and r>75 and r>gg*1.02 and r>bl*1.02 and gg>bl*.79 and not hair) or shoulder_edge
  iris=((132<=x<185 and 108<=y<132) or (198<=x<237 and 109<=y<133)) and bl>r*1.12 and bl>gg*1.06 and bl>75 and r<175
  m[x,y]=(255 if hair else 0,255 if skin else 0,255 if iris else 0,255)
# Hand-audited exposed-skin regions. Restrict the correction to warm shadow
# colors so pink strands and dark necklaces that cross these regions stay intact.
protected=Image.new('1',(320,320)); draw=ImageDraw.Draw(protected)
for points in [
 [(136,168),(145,170),(159,176),(174,179),(175,195),(140,194),(136,190)],
 [(145,210),(173,210),(175,220),(184,220),(193,226),(195,243),(200,251),(200,274),(145,270)],
 [(228,227),(236,228),(243,232),(249,240),(253,250),(254,268),(241,268),(239,255),(236,249),(231,242)],
 [(57,219),(66,212),(80,209),(97,211),(108,217),(115,229),(117,241),(111,248),(106,251),(96,252),(84,256),(72,261),(64,267),(57,267),(54,251),(54,233)]
]: draw.polygon(points,fill=1)
for y in range(165,271):
 for x in range(53,255):
  if not protected.getpixel((x,y)): continue
  r,gg,bl,alpha=a[x,y]
  if alpha>=30 and r>125 and r>gg*1.15 and -20<=bl-gg<18:
   _,_,iris,_=m[x,y];m[x,y]=(0,255,iris,255)
# Extend only hair-colored edge pixels adjacent to selected hair in audited
# exterior regions. Face, exposed shoulders, neck and chest are excluded.
snapshot=out.copy().load()
for y in range(320):
 for x in range(320):
  exterior=(y<75 or (75<=y<200 and (x<94 or x>235)) or
            (200<=y<280 and (x<52 or x>255)) or y>=280)
  if not exterior: continue
  r,gg,bl,alpha=a[x,y]; hair,skin,iris,_=snapshot[x,y]
  if hair or skin or iris or alpha==0: continue
  if not (r>45 and r>gg*1.20 and bl>gg*1.12 and r>bl*1.02): continue
  nearby=any(0<=x+dx<320 and 0<=y+dy<320 and snapshot[x+dx,y+dy][0]
             for dy in (-1,0,1) for dx in (-1,0,1))
  if nearby:m[x,y]=(255,0,0,255)
out.save(p/'portrait-color-mask.png',optimize=True)
# The closed-eye artwork replaces pixels inside the two blink regions; select
# its own eyelid skin while retaining the open frame's protected hair map.
c=Image.open(p/'portrait-blink.png').convert('RGBA').resize((320,320),Image.Resampling.NEAREST).load()
closed=out.copy(); cm=closed.load()
for y in range(320):
 for x in range(320):
  hair,sk,iris,_=m[x,y]
  if (132<=x<185 and 108<=y<132) or (198<=x<237 and 109<=y<133):
   r,gg,bl,alpha=c[x,y]
   sk=255 if not hair and r>75 and r>gg*1.02 and r>bl*1.02 and gg>bl*.79 else 0
   iris=0
  cm[x,y]=(hair,sk,iris,255)
closed.save(p/'portrait-blink-color-mask.png',optimize=True)
# The closed-eye source contains two saturated pink wedges over dark outer
# eyeliner pixels. Preserve the open frame at those audited eye corners.
guard=Image.new('RGBA',(320,320),(0,0,0,255)); guard_pixels=guard.load()
for y in range(110,122):
 for x in list(range(132,145))+list(range(225,235)):
  r,gg,bl,alpha=c[x,y]; or_,og,ob,oa=a[x,y]
  if alpha and or_<55 and og<40 and ob<55 and r>190 and r>gg*1.35 and bl>gg*1.15:
   guard_pixels[x,y]=(255,0,0,255)
guard.save(p/'portrait-blink-corner-guard.png',optimize=True)
