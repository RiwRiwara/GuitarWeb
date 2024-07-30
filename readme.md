# AI-Powered-Guitar-Learning-Platform
# Disclaimer
## ข้อตกลงการใช้งานโปรแกรม 
ข้อตกลงในการใช้งานซอฟแวร์
	ซอฟแวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายอวิรุทธิ์ ภู่แสนสอาด นายจิตตพัฒน์ 	จรรยารุ่งโรจน์ และนางสาวปุณณภา เทียนชัย จากมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ภายใต้การดูแลของ ดร.ฐิตาภรณ์ กนกรัตน ภายใต้โครงการ แพลตฟอร์มการเรียนรู้กีต้าร์ด้วยระบบปัญญาประดิษฐ์ (AI-Powered Guitar Learning Platform) ซึ่งสนับสนุนโดย สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟแวร์ ลิขสิทธิ์ของซอฟแวร์นี้จึงเป็นของผู้พัฒนา ซึ่งผู้พัฒนาได้รับอนุญาตให้สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ เผยแพร่ซอฟแวร์นี้ตาม "ต้นฉบับ" โดยไม่มีการแก้ไขดัดแปลงใด ๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพานิชย์ โดยไม่คิดค่าตอบแทนการใช้ซอฟแวร์ ดังนั้น  สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟแวร์ รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟแวร์ ตลอดจนไม่รับประกันความเสียหายต่าง ๆ อันเกิดจากการใช้ซอฟแวร์นี้ทั้งสิ้น

## License Agreement 
This software is a work developed by Mr. Awirut Phusaensaart, Mr. Jittapat Chanyarungroj and Miss Punnapa Thianchai from King Mongkut's University of Technology Thonburi under the provision of Dr. Thittaporn Ganokratanaa under AI-Powered Guitar Learning Platform, which has been supported by the National Science and Technology Development Agency (NSTDA), in order to encourage pupils and students to learn and practice their skills in developing software. Therefore, the intellectual property of this software shall belong to the developer and the developer gives NSTDA a permission to distribute this software as an “as is” and non-modified software for a temporary and non-exclusive use without remuneration to anyone for his or her own purpose or academic purpose, which are not commercial purposes.  In this connection, NSTDA shall not be responsible to the user for taking care, maintaining, training, or developing the efficiency of this software. Moreover, NSTDA shall not be liable for any error, software efficiency and damages in connection with or arising out of the use of the software.”

# คู่มือการติดตั้ง
สิ่งที่จำเป็นต้องมีก่อนการติดตั้ง

1. Python - [https://www.python.org/downloads/]
2. Git - [https://git-scm.com/downloads]

## ดาวน์โหลด source code
ทำการสร้าง folder ที่จะเก็บข้อมูลของโครงการ จากนั้นทำการเปิด **Command Line** / **Powercell**
- ทำการโคลนหรือดาวนโหลดจากลิงค์ด้านล่าง
```
git clone https://github.com/RiwRiwara/GuitarWeb.git
```
- เข้าไปที่ Directory ของโปรเจค
```
cd ./GuitarWeb
```

## การตั้งค่าสภาพแวดล้อมจำลอง - Setup environment
- สร้างสภาพแวดล้อมจำลองด้วยคำสั่งด้านล่าง
```
python -m venv myenv
```
- เปิดใช้งานสภาพแวดล้อมจำลอง
```
.\myenv\Scripts\activate
```
- เมื่อเปิดสภาพแวดล้อมจำลองสำเร็จ Command Line จะแสดง
```
(myenv) PS D:\Project\GuitarWeb>
```


## ติดตั้งไลบรารี่
```
pip install -r requirements.txt
```

## ทดสอบโปรแกรม
```
python app.py
```
- เมื่อรันคำสั่งข้างต้นจะแสดงข้อมูลขแงเว็บไซต์ และสามารถเข้าเว็บไซต์ได้ที่ **http://127.0.0.1:5000**
```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 625-088-670
```
