const WORKFLOWS_DATA = {
  sand: {
    title: "โครงการอนุญาตดูดทราย",
    description: "ระบบบริหารจัดการคำขออนุญาตดูดทราย ตามมาตรา 9 แห่งประมวลกฎหมายที่ดิน",
    requests: [
      {
        id: "sand-req-1",
        title: "1. คำขออนุญาตดูดทราย",
        description: "ขั้นตอนการยื่นคำขอเพื่อพิจารณาอนุญาตดูดทราย ระหว่าง ELicense กับ DOL2",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EXP"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=266"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง,checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "14. แบบพิมพ์",
            api: "ESL : /elss/els/sand/api/v1/ext/xxxxxxxxxxx",
            params: "",
            db: "",
            notes: "แบบพิมพ์ ดึงข้อมูล รายละเอียดดูดทราย tb_els_sec9,tb_els_sec9_property,tb_els_sec9_resource"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "15. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "16. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },
          {
            from: "schedule",
            to: "REG",
            label: "17. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "18. ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "19. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "20. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. (อาจจะไม่มี) รอออกใบอนุญาต",
            api: "ELS : /ext/requests/workflow/license/pending",
            params: "",
            db: "",
            notes: "รอไป เคาะ flow อีกทีนึง"
          }
        ]
      },
      {
        id: "sand-req-2",
        title: "2. คำขอรับใบอนุญาตดูดทราย",
        description: "ขั้นตอนหลังจากที่คณะกรรมการอนุมัติ ผู้ขอยื่นคำขอรับใบอนุญาตเพื่อเสนอผู้ว่าเซ็น ระหว่าง ELicense กับ DOL2",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EXP"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=ขึ้นกับคำขอแรก ส่ง processOldSeq ด้วย"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "14. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "15. จดทะเบียน",
            api: "",
            params: "",
            db: "",
            notes: "เมนูจดทะเบียน จบงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "16. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "17. ดำเนินการตามขั้นตอน EXP กรอกข้อมูลใบอนุญาตและแสกนใยอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: "เมนู ทะเบียนใบอนุญาตมาตรา 9(2) หน้า EXPSREG004"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "18. ส่งข้อมูลใบอนุญาตและภาพแสกน",
            api: "",
            params: "",
            db: "",
            notes: "ส่งข้อมูลใบอนุญาตดูดทรายมายัง eLicense"
          },          
          {
            from: "ELS",
            to: "minio",
            label: "19. PDFแสกน และ Gen PDF ใส่ Timestamp + CA",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู การ Gen flie "
          },
          {
            from: "ELS",
            to: "ELV",
            label: "20. insert ELV ให้",
            api: "",
            params: "",
            db: "",
            notes: "tb_elv_sec9_license_new"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. หยอดค่าใน ELV sec9_license และ paper ",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู หยอดค่า tb_elv_license,tb_elv_sec9_license_paper"
          },
          {
            from: "minio",
            to: "EXP",
            label: "22. ไฟล์ใบอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: "EXP สามารถดูได้"
          },
          {
            from: "User",
            to: "ELS",
            label: "22. ดาวน์โหลดใบอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: ""
          }
        ]
      },
      {
        id: "sand-req-3",
        title: "3. คำขอต่ออายุใบอนุญาตดูดทราย",
        description: "ขั้นตอนยื่นคำขอต่ออายุใบอนุญาตดูดทราย ระหว่าง ELicense กับ DOL2",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EXP"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=317"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "14. แบบพิมพ์",
            api: "ESL : /elss/els/sand/api/v1/ext/xxxxxxxxxxx",
            params: "",
            db: "",
            notes: "แบบพิมพ์ ดึงข้อมูล รายละเอียดดูดทราย tb_els_sec9,tb_els_sec9_property,tb_els_sec9_resource"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "15. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "16. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },
          {
            from: "schedule",
            to: "REG",
            label: "17. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "18. ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "19. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "20. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. (อาจจะไม่มี) รอออกใบอนุญาต",
            api: "ELS : /ext/requests/workflow/license/pending",
            params: "",
            db: "",
            notes: "รอไป เคาะ flow อีกทีนึง"
          }
        ]
      },
      {
        id: "sand-req-4",
        title: "4. คำรับใบแทนใบอนุญาตดูดทราย (flow อาจจะเปลี่ยน)",
        description: "ขั้นตอนขอออกใบแทนใบอนุญาตดูดทราย ระหว่าง ELicense กับ DOL2",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EXP"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=246"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "13. (flow เดิม) เอาใบอนุญาตเดิม มาใส่คำว่าใบแทน",
            api: "ELV : elss/pdf/api/v1/license/sand/replacement-uploaded",
            params: "",
            db: "",
            notes: "ทำใบแทน เอาใบกระดาษมา ใส่คำว่าใบแทนข้างบน"
          },
          {
            from: "๊User",
            to: "ELS",
            label: "14. (flow เดิม) ดาวน์โหลดใบแทน",
            api: "",
            params: "",
            db: "",
            notes: "ใบแทนข้างบน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "15. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "16. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "17. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "18. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          }
        ]
      },
      {
        id: "sand-req-5",
        title: "5. คำขอยกเลิกใบอนุญาตดูดทราย (flow อาจจะเปลี่ยน)",
        description: "ผู้รับใบอนุญาตยื่นความประสงค์ขอยกเลิกการประกอบการดูดทราย หรือขอยกเลิกใบอนุญาตก่อนถึงกำหนดวันสิ้นสุดอายุการใช้งาน",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EXP"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "User",
            to: "ELS",
            label: "2. ไม่มีแนบไฟล์ กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=xxx"
          },
          {
            from: "User",
            to: "schedule",
            label: "4. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "5. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "6. (flow เดิม) คาดใบอนุญาตสีแดง ว่ายกเลิก",
            api: "ELV : elss/pdf/api/v1/license/sand/cancel-uploaded",
            params: "",
            db: "",
            notes: "ปรับเปลี่ยนสถานะใบอนุญาตเป็นยกเลิก UPDATE tb_elv_sec9_license_new SET status_flag='C'"
          },
          {
            from: "๊User",
            to: "ELV",
            label: "7. (flow เดิม) แสดงใบอุญาต ยกเลิก",
            api: "ELV : elss/pdf/api/v1/license/sand/cancel-uploaded",
            params: "",
            db: "",
            notes: ""
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "8. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "9. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "10. จดทะเบียน",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          }
        ]
      }
    ]
  },
  land: {
    title: "โครงการจัดสรรที่ดิน",
    description: "ระบบควบคุมและอนุมัติการจัดสรรที่ดิน ตามพระราชบัญญัติการจัดสรรที่ดิน พ.ศ. 2543",
    requests: [
      {
        id: "land-req-1",
        title: "1. คำขออนุญาตทำการจัดสรรที่ดิน",
        description: "ขั้นตอนการยื่นคำขอเพื่อรับใบอนุญาตทำการจัดสรรที่ดิ ระหว่าง ELicense กับ DOL2",
        systems: ["User", "ELS","PiPr", "minio", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN","EVD"],
        meetingNotes: "",
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กรอกข้อมูลค้นหาเอกสารสิทธิ",
            api: "",
            params: "",
            db: "",
            notes: ""
          },
          {
            from: "ELS",
            to: "PiPr",
            label: "2. ค้นหา โฉนด + ผู้ถือกรรมสิทธิ",
            api: "PiPr : https://{{baseUrl}}/api/v1/RealTime/ParcelOwnerByParcelNumber?ProvinceCode=13&AmphoeCode=01&ParcelNumber=75943",
            params: "",
            db: "",
            notes: "api sercvice ของ Pipr https://pipr.dol.go.th/dem02_2?variable=12"
          },
          {
            from: "ELS",
            to: "PiPr",
            label: "3. ค้นหา น.ส3 + ผู้ถือกรรมสิทธิ",
            api: "PiPr : https://{{baseUrl}}/api/v1/RealTime/NS3AOwnerByNS3ANumber?ProvinceCode=66&AmphoeCode=04&TambonCode=01&ParcelNS3Number=432",
            params: "",
            db: "",
            notes: "api sercvice ของ Pipr https://pipr.dol.go.th/dem02_2?variable=13"
          },
          {
            from: "User",
            to: "ELS",
            label: "4. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "5. ส่งคำขอ",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=267"
          },
          {
            from: "ELS",
            to: "REG",
            label: "6. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "7. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "8. กดดูไฟล์",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "9. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "10. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "11. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "12. ส่งเอกสารหลักฐาน",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "13. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "14. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "15. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "16. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "17. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "18. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },
          {
            from: "schedule",
            to: "REG",
            label: "19. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "20. บันทึกเลขใบอนุญาตในบัญชีคุม",
            api: "",
            params: "",
            db: "",
            notes: "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)"
          },
          {
            from: "REG",
            to: "ELS",
            label: "21. ไม่รู้จะยิงออกหรือยิงเข้า ถามพี่ตา?",
            api: "",
            params: "",
            db: "",
            notes: ""
          },
          {
            from: "User",
            to: "ELS",
            label: "22. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
            api: "",
            params: "",
            db: "",
            notes: ""
          },
          {
            from: "User",
            to: "ELS",
            label: "23. พิมพ์ใบแจ้งชำระเงิน ",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต"
          },
          {
            from: "User",
            to: "schedule",
            label: "24. ไป ชำระเงิน ภายใน 23.00",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "25. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "26. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "27. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "28. จดทะเบียน",
            api: "",
            params: "",
            db: "",
            notes: "จดทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "29. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EVD",
            label: "30. แสกนใบอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: "แสกนใบอนุญาต"
          },
          {
            from: "EVD",
            to: "ELS",
            label: "31. ส่งภาพแสกน",
            api: "",
            params: "",
            db: "",
            notes: "ไฟล์ DOL2 มา ELicense"
          },
          {
            from: "ELS",
            to: "minio",
            label: "32. PDFแสกน และ Gen PDF ใส่ Timestamp + CA",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู การ Gen flie"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "33. insert ELV ให้",
            api: "",
            params: "",
            db: "",
            notes: "tb_elv_license และ tb_elv_license_paper"
          },
          {
            from: "User",
            to: "ELS",
            label: "34. ดาวน์โหลดใบอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: ""
          },
        ]
          
        
      },
      {
        id: "land-req-2",
        title: "2. คำขอแก้ไขเปลี่ยนแปลงแผนผังโครงการหรือวิธีการในการจัดสรรที่ดิน",
        description: "การขอปรับปรุงแผนผังการจัดสรรที่ดิน หรือเปลี่ยนแปลงวิธีการจัดสรรที่เคยได้รับอนุญาตไว้เดิม",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-3",
        title: "3. คำขอโอนใบอนุญาต",
        description: "การขอโอนใบอนุญาตจัดสรรที่ดินจากผู้จัดสรรที่ดินรายเดิม ไปยังผู้ประกอบการรายใหม่",
         systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-4",
        title: "4. คำขอรับโอนใบอนุญาต (กรณีผู้จัดสรรที่ดินตาย)",
        description: "ทายาทหรือผู้จัดการมรดกยื่นคำขอรับโอนใบอนุญาตจัดสรรที่ดินเนื่องจากผู้ได้รับใบอนุญาตเดิมเสียชีวิต",
         systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-5",
        title: "5. คำขอรับใบแทนใบอนุญาต",
        description: "การขอใบแทนใบอนุญาตทำการจัดสรรที่ดิน (อ.ส.ป. 1) กรณีเอกสารสูญหาย ชำรุด หรือเลอะเลือน",
         systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-6",
        title: "6. คำขอยกเลิกการจัดสรรที่ดิน",
        description: "ผู้จัดสรรยื่นคำขอยกเลิกการทำการจัดสรรที่ดินทั้งหมดหรือบางส่วนที่ยังไม่ได้ทำการจำหน่ายให้แก่ผู้ซื้อ",
         systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-7",
        title: "7. คำขออนุญาตก่อภาระผูกฟันในที่ดินจัดสรร",
        description: "ผู้จัดสรรยื่นคำขอรับอนุญาตก่อภาระผูกพัน (เช่น จดจำนอง หรือก่อสิทธิ์ภาระจำยอม) ในที่ดินโครงการจัดสรร",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      },
      {
        id: "land-req-8",
        title: "8. คำขอจดทะเบียนจัดตั้งนิติบุคคลหมู่บ้านจัดสรร",
        description: "ผู้ซื้อแปลงย่อยหรือผู้จัดสรรร่วมมือกันยื่นจดทะเบียนจัดตั้งนิติบุคคลหมู่บ้านจัดสรร เพื่อรับมอบสิทธิ์ระบบสาธารณูปโภคเข้ามาบริหาร",
         systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        steps: [

        ]
      }
    ]
  },
  schedule: {
    title: "งานตั้งเวลา (Schedule)",
    description: "ระบบประมวลผลอัตโนมัติเบื้องหลัง",
    requests: [
      {
        id: "schedule-req-1",
        title: "1. งาน Schedule (งานตั้งเวลา)",
        description: "งานประมวลผลเบื้องหลังตามเวลาที่กำหนด (Background Schedule Jobs) ที่ไม่ได้ผูกกับขั้นตอนของคำขอโดยตรง",
        systems: ["schedule", "ELS", "ELV","minio","REG","กรมบัญชีกลาง"],
        meetingNotes: "งานระบบเบื้องหลัง (Cron Job/Scheduler):\n• ทำงานอัตโนมัติตามช่วงเวลาที่กำหนด",
        steps: [
          {
            from: "schedule",
            to: "กรมบัญชีกลาง",
            label: "1. ตรวจสอบการชำระเงิน",
            api: "PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที ตั้งแต่ 6.00-23.00 น."
          },
          {
            from: "schedule",
            to: "REG",
            label: "2. ตรวจสอบสถานะ อนุมัติ/จดทะเบียน",
            api: "REG : /eLicense-service/elss/elss/api/v1/public/sec9/getProcessStatus/xxxxxxx",
            params: "",
            db: "",
            notes: "getProcessStatus ใช้เลข processSeq ทุก 15 นาที ตั้งแต่ 6.00 - 22.55 น."
          },
          {
            from: "schedule",
            to: "ELV",
            label: "3. สิ้นสุดใบอนุญาตดูดทราย ",
            api: "",
            params: "",
            db: "",
            notes: "update tb_elv_sec9_license_new.status_flag=F สิ้นสุดระยะเวลาของใบอนุญาต ทุก 23.58 น."
          }
        ]
      }
    ]
  }
};

// Export dynamic module support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WORKFLOWS_DATA;
}
