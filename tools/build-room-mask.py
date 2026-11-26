"""Build pixel-aligned room selection maps for the existing sprite sheet."""
from PIL import Image
from pathlib import Path
p=Path('assets/avatar/art')
size=(600,656)
s=Image.open(p/'walk-sheet.png').convert('RGBA').resize(size,Image.Resampling.NEAREST).load()
g=Image.open(p/'walk-hair-mask.png').convert('RGBA').resize(size,Image.Resampling.NEAREST).load()
c=Image.open(p/'walk-blink.png').convert('RGBA').resize(size,Image.Resampling.NEAREST).load()
openmap=Image.new('RGBA',size,(0,0,0,255)); closedmap=openmap.copy(); a=openmap.load(); z=closedmap.load()
for y in range(656):
 for x in range(600):
  r,gg,b,alpha=s[x,y]; gr,gb,gl,ga=g[x,y]; ly=y%164; row=y//164
  hair=ly<96 and ga>=4 and r>45 and r>gg*1.12 and b>=gg and r>b*1.02
  # Protect the exposed neck shadow in the front and side walking frames.
  neck_centers=((91,78,64,51),(78,65,51,38),(0,0,0,0),(104,89,78,63))
  cx=neck_centers[row][x//150]
  neck_shadow=(row!=2 and abs(x%150-cx)<=10 and 62<=ly<=72 and r>75 and r>gg*1.15 and b-gg<26)
  if neck_shadow: hair=False
  skin_region=(42<=ly<=72 or 96<=ly<=123)
  def skin(px):
   r,g,b,_=px
   return neck_shadow or (skin_region and r>75 and r>g*1.02 and r>b*1.02 and g>b*.79 and not hair)
  iris=row!=2 and 48<=ly<=53 and b>r*1.12 and b>gg*1.06 and b>75 and r<175
  # Isolated blue-gray pixels beside the eyes belong to nearby accessories.
  frame=x//150; lx=x%150
  if row==0 and frame==0 and ((ly==49 and lx<82) or ly==48): iris=False
  if row==3 and frame==1 and ly==48 and lx<88: iris=False
  if row==3 and frame==2 and lx>82: iris=False
  a[x,y]=(255 if hair else 0,255 if skin(s[x,y]) else 0,255 if iris else 0,255)
  z[x,y]=(255 if hair else 0,255 if skin(c[x,y]) else 0,0,255)
openmap.save(p/'walk-color-mask.png',optimize=True)
closedmap.save(p/'walk-blink-color-mask.png',optimize=True)
