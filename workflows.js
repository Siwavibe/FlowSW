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
        activationBars: [
          { system: "ELS", startStepIdx: 0, endStepIdx: 3 },
          { system: "REG", startStepIdx: 1, endStepIdx: 2 },
          { system: "REG", startStepIdx: 4, endStepIdx: 7 },
          { system: "ELS", startStepIdx: 8, endStepIdx: 9 },
          { system: "schedule", startStepIdx: 11, endStepIdx: 12 },
          { system: "REG", startStepIdx: 13, endStepIdx: 14 },
          { system: "REG", startStepIdx: 16, endStepIdx: 17 },
          { system: "EXP", startStepIdx: 18, endStepIdx: 20 }
        ],
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            stepNum: "1",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            stepNum: "1.1",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=266"
          },
          {
            from: "REG",
            to: "ELS",
            label: "processSeq",
            isReturn: true,
            hideBubble: true,
            api: "",
            params: "",
            db: "",
            notes: "ได้ ProcessSeq กลับมาด้วย"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            stepNum: "1.2",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            stepNum: "2",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            stepNum: "2.1",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            stepNum: "2.2",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            stepNum: "2.3",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            stepNum: "3",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            stepNum: "3.1",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง,checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            stepNum: "4",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            stepNum: "5",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            stepNum: "5.1",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            stepNum: "6",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "14. แบบพิมพ์",
            stepNum: "6.1",
            api: "ESL : /elss/els/sand/api/v1/ext/xxxxxxxxxxx",
            params: "",
            db: "",
            notes: "แบบพิมพ์ ดึงข้อมูล รายละเอียดดูดทราย tb_els_sec9,tb_els_sec9_property,tb_els_sec9_resource"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "15. ชำระเงิน ใบสั่ง E000X",
            stepNum: "7",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "16. อนุมัติรับคำขอ",
            stepNum: "8",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },
          {
            from: "schedule",
            to: "REG",
            label: "17. เช็คสถานะ ",
            stepNum: "8.1",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "18. ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            stepNum: "9",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "19. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            stepNum: "9.1",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "20. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            stepNum: "9.2",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. (อาจจะไม่มี) รอออกใบอนุญาต",
            stepNum: "10",
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
        activationBars: [
          { system: "ELS", startStepIdx: 0, endStepIdx: 3 },
          { system: "REG", startStepIdx: 1, endStepIdx: 2 },
          { system: "REG", startStepIdx: 4, endStepIdx: 7 },
          { system: "ELS", startStepIdx: 8, endStepIdx: 9 },
          { system: "schedule", startStepIdx: 11, endStepIdx: 12 },
          { system: "EXP", startStepIdx: 17, endStepIdx: 18 },
          { system: "ELS", startStepIdx: 18, endStepIdx: 21 }
        ],
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            stepNum: "1",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            stepNum: "1.1",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=ขึ้นกับคำขอแรก ส่ง processOldSeq ด้วย"
          },
          {
            from: "REG",
            to: "ELS",
            label: "processSeq",
            isReturn: true,
            hideBubble: true,
            api: "",
            params: "",
            db: "",
            notes: "ได้ ProcessSeq กลับมาด้วย"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            stepNum: "1.2",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            stepNum: "2",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            stepNum: "2.1",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            stepNum: "2.2",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            stepNum: "2.3",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            stepNum: "3",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            stepNum: "3.1",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            stepNum: "4",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            stepNum: "5",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            stepNum: "5.1",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            stepNum: "6",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "14. ชำระเงิน ใบสั่ง E000X",
            stepNum: "7",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "15. จดทะเบียน",
            stepNum: "8",
            api: "",
            params: "",
            db: "",
            notes: "เมนูจดทะเบียน จบงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "16. เช็คสถานะ ",
            stepNum: "8.1",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "17. ดำเนินการตามขั้นตอน EXP กรอกข้อมูลใบอนุญาตและแสกนใยอนุญาต",
            stepNum: "9",
            api: "",
            params: "",
            db: "",
            notes: "เมนู ทะเบียนใบอนุญาตมาตรา 9(2) หน้า EXPSREG004"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "18. ส่งข้อมูลใบอนุญาตและภาพแสกน",
            stepNum: "9.1",
            api: "",
            params: "",
            db: "",
            notes: "ส่งข้อมูลใบอนุญาตดูดทรายมายัง eLicense"
          },          
          {
            from: "ELS",
            to: "minio",
            label: "19. PDFแสกน และ Gen PDF ใส่ Timestamp + CA",
            stepNum: "9.2",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู การ Gen flie "
          },
          {
            from: "ELS",
            to: "ELV",
            label: "20. insert ELV ให้",
            stepNum: "9.3",
            api: "",
            params: "",
            db: "",
            notes: "tb_elv_sec9_license_new"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. หยอดค่าใน ELV sec9_license และ paper ",
            stepNum: "9.4",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู หยอดค่า tb_elv_license,tb_elv_sec9_license_paper"
          },
          {
            from: "minio",
            to: "EXP",
            label: "22. ไฟล์ใบอนุญาต",
            stepNum: "9.5",
            api: "",
            params: "",
            db: "",
            notes: "EXP สามารถดูได้"
          },
          {
            from: "User",
            to: "ELS",
            label: "22. ดาวน์โหลดใบอนุญาต",
            stepNum: "10",
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
        activationBars: [
          { system: "ELS", startStepIdx: 0, endStepIdx: 3 },
          { system: "REG", startStepIdx: 1, endStepIdx: 2 },
          { system: "REG", startStepIdx: 4, endStepIdx: 7 },
          { system: "ELS", startStepIdx: 8, endStepIdx: 9 },
          { system: "schedule", startStepIdx: 11, endStepIdx: 12 },
          { system: "REG", startStepIdx: 13, endStepIdx: 14 },
          { system: "REG", startStepIdx: 16, endStepIdx: 17 },
          { system: "EXP", startStepIdx: 18, endStepIdx: 20 }
        ],
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            stepNum: "1",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            stepNum: "1.1",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=317"
          },
          {
            from: "REG",
            to: "ELS",
            label: "processSeq",
            isReturn: true,
            hideBubble: true,
            api: "",
            params: "",
            db: "",
            notes: "ได้ ProcessSeq กลับมาด้วย"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            stepNum: "1.2",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            stepNum: "2",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            stepNum: "2.1",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            stepNum: "2.2",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            stepNum: "2.3",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            stepNum: "3",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            stepNum: "3.1",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            stepNum: "4",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            stepNum: "5",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            stepNum: "5.1",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "13. รับเรื่องและเรียกคิว",
            stepNum: "6",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "14. แบบพิมพ์",
            stepNum: "6.1",
            api: "ESL : /elss/els/sand/api/v1/ext/xxxxxxxxxxx",
            params: "",
            db: "",
            notes: "แบบพิมพ์ ดึงข้อมูล รายละเอียดดูดทราย tb_els_sec9,tb_els_sec9_property,tb_els_sec9_resource"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "15. ชำระเงิน ใบสั่ง E000X",
            stepNum: "7",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "16. อนุมัติรับคำขอ",
            stepNum: "8",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },
          {
            from: "schedule",
            to: "REG",
            label: "17. เช็คสถานะ ",
            stepNum: "8.1",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "18. ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            stepNum: "9",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "19. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            stepNum: "9.1",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "20. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            stepNum: "9.2",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "21. (อาจจะไม่มี) รอออกใบอนุญาต",
            stepNum: "10",
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
        activationBars: [
          { system: "ELS", startStepIdx: 0, endStepIdx: 3 },
          { system: "REG", startStepIdx: 1, endStepIdx: 2 },
          { system: "REG", startStepIdx: 4, endStepIdx: 7 },
          { system: "ELS", startStepIdx: 8, endStepIdx: 9 },
          { system: "schedule", startStepIdx: 11, endStepIdx: 12 },
          { system: "ELS", startStepIdx: 13, endStepIdx: 14 },
          { system: "REG", startStepIdx: 17, endStepIdx: 18 }
        ],
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            stepNum: "1",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "ELS",
            to: "REG",
            label: "2. ส่งคำขอ",
            stepNum: "1.1",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=246"
          },
          {
            from: "REG",
            to: "ELS",
            label: "processSeq",
            isReturn: true,
            hideBubble: true,
            api: "",
            params: "",
            db: "",
            notes: "ได้ ProcessSeq กลับมาด้วย"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งเอกสารหลักฐาน",
            stepNum: "1.2",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "4. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
            stepNum: "2",
            api: "",
            params: "",
            db: "",
            notes: "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร"
          },
          {
            from: "REG",
            to: "minio",
            label: "5. กดดูไฟล์",
            stepNum: "2.1",
            api: "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "6. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
            stepNum: "2.2",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "ตรวจเอกสาร หลักฐาน"
          },
          {
            from: "REG",
            to: "ELS",
            label: "7. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
            stepNum: "2.3",
            api: "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
            params: "",
            db: "",
            notes: "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ"
          },
          {
            from: "User",
            to: "ELS",
            label: "8. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
            stepNum: "3",
            api: "",
            params: "",
            db: "",
            notes: "แนบไฟล์และส่งใหม่อีกครั้ง"
          },
          {
            from: "ELS",
            to: "REG",
            label: "9. ส่งเอกสารหลักฐาน",
            stepNum: "3.1",
            api: "REG : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ"
          },
          {
            from: "User",
            to: "ELS",
            label: "10. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
            stepNum: "4",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "User",
            to: "schedule",
            label: "11. ไป ชำระเงิน ภายใน 23.00",
            stepNum: "5",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "12. สถานะ ชำระเงิน",
            stepNum: "5.1",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "13. (flow เดิม) เอาใบอนุญาตเดิม มาใส่คำว่าใบแทน",
            stepNum: "6",
            api: "ELV : elss/pdf/api/v1/license/sand/replacement-uploaded",
            params: "",
            db: "",
            notes: "ทำใบแทน เอาใบกระดาษมา ใส่คำว่าใบแทนข้างบน"
          },
          {
            from: "User",
            to: "ELS",
            label: "14. (flow เดิม) ดาวน์โหลดใบแทน",
            stepNum: "6.1",
            api: "",
            params: "",
            db: "",
            notes: "ใบแทนข้างบน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "15. รับเรื่องและเรียกคิว",
            stepNum: "7",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "16. ชำระเงิน ใบสั่ง E000X",
            stepNum: "8",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "17. อนุมัติรับคำขอ",
            stepNum: "9",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "18. เช็คสถานะ ",
            stepNum: "9.1",
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
        activationBars: [
          { system: "ELS", startStepIdx: 0, endStepIdx: 3 },
          { system: "REG", startStepIdx: 2, endStepIdx: 3 },
          { system: "schedule", startStepIdx: 4, endStepIdx: 5 },
          { system: "REG", startStepIdx: 10, endStepIdx: 11 }
        ],
        steps: [
          {
            from: "User",
            to: "ELS",
            label: "1. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
            stepNum: "1",
            api: "",
            params: "",
            db: "",
            notes: "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน "
          },
          {
            from: "User",
            to: "ELS",
            label: "2. ไม่มีแนบไฟล์ กด พิมพ์ใบแจ้งชำระเงิน",
            stepNum: "2",
            api: "กรมบัญชีกลาง : PMT1|BillpaymentManage",
            params: "",
            db: "",
            notes: "สร้างใบแจ้งชำระเงิน"
          },
          {
            from: "ELS",
            to: "REG",
            label: "3. ส่งคำขอ",
            stepNum: "2.1",
            api: "REG : /elss/api/v1/public/sec9/processData",
            params: "",
            db: "",
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=xxx"
          },
          {
            from: "REG",
            to: "ELS",
            label: "processSeq",
            isReturn: true,
            hideBubble: true,
            api: "",
            params: "",
            db: "",
            notes: "ได้ ProcessSeq กลับมาด้วย"
          },
          {
            from: "User",
            to: "schedule",
            label: "4. ไป ชำระเงิน ภายใน 23.00",
            stepNum: "3",
            api: "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "5. สถานะ ชำระเงิน",
            stepNum: "3.1",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "6. (flow เดิม) คาดใบอนุญาตสีแดง ว่ายกเลิก",
            stepNum: "4",
            api: "ELV : elss/pdf/api/v1/license/sand/cancel-uploaded",
            params: "",
            db: "",
            notes: "ปรับเปลี่ยนสถานะใบอนุญาตเป็นยกเลิก UPDATE tb_elv_sec9_license_new SET status_flag='C'"
          },
          {
            from: "User",
            to: "ELV",
            label: "7. (flow เดิม) แสดงใบอุญาต ยกเลิก",
            stepNum: "4.1",
            api: "ELV : elss/pdf/api/v1/license/sand/cancel-uploaded",
            params: "",
            db: "",
            notes: ""
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "8. รับเรื่องและเรียกคิว",
            stepNum: "5",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "9. ชำระเงิน ใบสั่ง E000X",
            stepNum: "6",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "10. จดทะเบียน",
            stepNum: "7",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. เช็คสถานะ ",
            stepNum: "7.1",
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
        "id": "land-req-1",
        "title": "1. คำขออนุญาตทำการจัดสรรที่ดิน",
        "description": "ขั้นตอนการยื่นคำขอเพื่อรับใบอนุญาตทำการจัดสรรที่ดิ ระหว่าง ELicense กับ DOL2",
        "systems": [
                "User",
                "ELS",
                "PiPr",
                "minio",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. กรอกข้อมูลค้นหาเอกสารสิทธิ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "PiPr",
                        "label": "2. ค้นหา โฉนด + ผู้ถือกรรมสิทธิ",
                        "api": "PiPr : https://{{baseUrl}}/api/v1/RealTime/ParcelOwnerByParcelNumber?ProvinceCode=13&AmphoeCode=01&ParcelNumber=75943",
                        "params": "",
                        "db": "",
                        "notes": "api sercvice ของ Pipr https://pipr.dol.go.th/dem02_2?variable=12",
                        "stepNum": "1.1"
                },
                {
                        "from": "ELS",
                        "to": "PiPr",
                        "label": "3. ค้นหา น.ส3 + ผู้ถือกรรมสิทธิ",
                        "api": "PiPr : https://{{baseUrl}}/api/v1/RealTime/NS3AOwnerByNS3ANumber?ProvinceCode=66&AmphoeCode=04&TambonCode=01&ParcelNS3Number=432",
                        "params": "",
                        "db": "",
                        "notes": "api sercvice ของ Pipr https://pipr.dol.go.th/dem02_2?variable=13",
                        "stepNum": "1.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "4. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=267",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "6. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "7. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "8. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "9. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "10. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "11. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "12. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "13. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "14. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "15. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "16. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "17. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "18. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "19. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/sec9/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "20. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "21. มติคณะกรรมการ",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "22. แสกนใบอนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนใบอนุญาต",
                        "stepNum": "11"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "23. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "24. PDFแสกน และ Gen PDF ใส่ Timestamp + CA",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เจมส์ดู การ Gen flie",
                        "stepNum": "12.1"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "25. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license และ tb_elv_license_paper",
                        "stepNum": "12.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "26. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "13"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "27. ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "28. ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=267 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "14.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "29. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "15"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "30. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "16"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "31. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "32. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "33. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "18"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "34. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "19"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "35. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/sec9/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "19.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "36. ดาวน์โหลดใบอนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "20"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 2
                },
                {
                        "system": "ELS",
                        "startStepIdx": 3,
                        "endStepIdx": 6
                },
                {
                        "system": "REG",
                        "startStepIdx": 7,
                        "endStepIdx": 10
                },
                {
                        "system": "ELS",
                        "startStepIdx": 11,
                        "endStepIdx": 12
                },
                {
                        "system": "schedule",
                        "startStepIdx": 14,
                        "endStepIdx": 15
                },
                {
                        "system": "REG",
                        "startStepIdx": 18,
                        "endStepIdx": 19
                },
                {
                        "system": "REG",
                        "startStepIdx": 20,
                        "endStepIdx": 21
                },
                {
                        "system": "ELS",
                        "startStepIdx": 23,
                        "endStepIdx": 25
                },
                {
                        "system": "ELS",
                        "startStepIdx": 27,
                        "endStepIdx": 29
                },
                {
                        "system": "REG",
                        "startStepIdx": 28,
                        "endStepIdx": 29
                },
                {
                        "system": "schedule",
                        "startStepIdx": 31,
                        "endStepIdx": 32
                },
                {
                        "system": "REG",
                        "startStepIdx": 35,
                        "endStepIdx": 36
                }
        ]
},
{
        "id": "land-req-2",
        "title": "2. คำขอแก้ไขเปลี่ยนแปลงแผนผังโครงการหรือวิธีการในการจัดสรรที่ดิน",
        "description": "การขอปรับปรุงแผนผังการจัดสรรที่ดิน หรือเปลี่ยนแปลงวิธีการจัดสรรที่เคยได้รับอนุญาตไว้เดิม (หนังสืออนุญาต)",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=270 ส่ง projectSeq , prjChgPlanData",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=270 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-3",
        "title": "3. คำขอโอนใบอนุญาต",
        "description": "การขอโอนใบอนุญาตจัดสรรที่ดินจากผู้จัดสรรที่ดินรายเดิม ไปยังผู้ประกอบการรายใหม่ (หนังสืออนุญาต)",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=268 ส่ง projectSeq , prjTrfLicesnseData",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=268 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-4",
        "title": "4. คำขอรับโอนใบอนุญาต (กรณีผู้จัดสรรที่ดินตาย)",
        "description": "ทายาทหรือผู้จัดการมรดกยื่นคำขอรับโอนใบอนุญาตจัดสรรที่ดินเนื่องจากผู้ได้รับใบอนุญาตเดิมเสียชีวิต (หนังสืออนุญาต)",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=277 ส่ง projectSeq , prjTrfLicesnseData",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=277 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-5",
        "title": "5. คำขอรับใบแทนใบอนุญาต",
        "description": "การขอใบแทนใบอนุญาตทำการจัดสรรที่ดิน กรณีเอกสารสูญหาย ชำรุด หรือเลอะเลือน",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=255 ยังไม่รองรับ",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=255 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-6",
        "title": "6. คำขอยกเลิกการจัดสรรที่ดิน",
        "description": "ผู้จัดสรรยื่นคำขอยกเลิกการทำการจัดสรรที่ดินทั้งหมดหรือบางส่วนที่ยังไม่ได้ทำการจำหน่ายให้แก่ผู้ซื้อ",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=275 ส่ง projectSeq , prjTrfLicesnseData",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=275 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-7",
        "title": "7. คำขออนุญาตก่อภาระผูกฟันในที่ดินจัดสรร",
        "description": "ผู้จัดสรรยื่นคำขอรับอนุญาตก่อภาระผูกพัน (เช่น จดจำนอง หรือก่อสิทธิ์ภาระจำยอม) ในที่ดินโครงการจัดสรร",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=312 ส่ง projectSeq , processTempRegistName,processTempComment",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=312 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสืออนุญาต",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสืออนุญาต",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
},
{
        "id": "land-req-8",
        "title": "8. คำขอจดทะเบียนจัดตั้งนิติบุคคลหมู่บ้านจัดสรร",
        "description": "ผู้ซื้อแปลงย่อยหรือผู้จัดสรรร่วมมือกันยื่นจดทะเบียนจัดตั้งนิติบุคคลหมู่บ้านจัดสรร (หนังสือสำคัญ)",
        "systems": [
                "User",
                "minio",
                "ELS",
                "schedule",
                "ELV",
                "เจ้าหน้าที่",
                "REG",
                "FIN",
                "EVD"
        ],
        "meetingNotes": "Meeting 04/07/69 - 13.30 น.\n• ห้ามปรับลดพื้นที่สาธารณูปโภคโดยรวม เว้นแต่จะได้รับการอนุมัติเป็นกรณีพิเศษจากคณะกรรมการ\n• ต้องไม่กระทบสิทธิ์ของเจ้าของที่ดินแปลงย่อยที่จองหรือโอนไปแล้ว",
        "steps": [
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "1. Popup ค้นหาโครงการ/สำนักงาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "1"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "2. ค้นหา Project",
                        "api": "REG : /elss/api/v1/public/project/search",
                        "params": "",
                        "db": "",
                        "notes": "ค้นหาโครงการจาก DOL2",
                        "stepNum": "1.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "3. กดปุ่ม ส่งคำขอคำขอไปตรวจสอบ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ผู้ขอกดปุ่มส่งคำขอผ่านระบบ จากแท๊บ แนบเอกสารหลักฐาน ",
                        "stepNum": "2"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "4. ส่งคำขอ",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=271 ส่ง projectSeq , projectCorpData",
                        "stepNum": "2.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "5. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2",
                        "stepNum": "2.2"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "6. เมนู นัดล่วงหน้า > Popup เอกสารหลักฐาน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ดำเนินการคำขอที่ส่งมายัง DOL2 เพื่อตรวจเอกสาร",
                        "stepNum": "3"
                },
                {
                        "from": "REG",
                        "to": "minio",
                        "label": "7. กดดูไฟล์",
                        "api": "minio : /elss/minio-file-service/api/v1/ext/file/view/xxxxx.pdf",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสารเพื่อเปิดดูไฟล์ที่ eLicense",
                        "stepNum": "3.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "8. ตรวจเอกสาร ผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจเอกสาร หลักฐาน",
                        "stepNum": "3.1"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "9. บันทึกผล ตรวจผ่าน/ไม่ผ่าน",
                        "api": "ELS : /elss/els/sand/api/v1/ext/receive-dol/check-evd",
                        "params": "",
                        "db": "",
                        "notes": "เมนูนัดล่วงหน้า Popup ตรวจเอกสาร ส่งผลตรวจเอกสารหลักฐานไปยัง eLicense และ ELS ส่ง mail ต่อ",
                        "stepNum": "3.2"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "10. กรณี ไม่ผ่าน แนบไฟล์รอบที่ n",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แนบไฟล์และส่งใหม่อีกครั้ง",
                        "stepNum": "4"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "11. ส่งเอกสารหลักฐาน",
                        "api": "REG : /elss/api/v1/public/evd/sendEvd",
                        "params": "",
                        "db": "",
                        "notes": "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2 ส่ง checkEvdSts=3 ทุกครั้ง, checkCount และ evdCount=ตามรอบ",
                        "stepNum": "4.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "12. กรณี ตรวจผ่าน กด พิมพ์ใบแจ้งชำระเงิน",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน",
                        "stepNum": "5"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "13. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "6"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "14. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "6.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "15. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "7"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "16. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "8"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "17. อนุมัติรับคำขอ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP ",
                        "stepNum": "9"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "18. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "9.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "19. บันทึกเลขใบอนุญาตในบัญชีคุม",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนู บัญชีคุมจัดสรร (จ.ส.ก.4)",
                        "stepNum": "10"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "20. มติคณะกรรมการ มั้ย??",
                        "api": "REG : /elss/api/v1/public................",
                        "method": "GET",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "10.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "21. เมนู ติดตาม กดดำเนินการเพื่อสร้าง คิววันที่ 2",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "11"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "ปุ่ม ส่งคำขอ เพื่อส่งข้อมูลคำขอ ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "12"
                },
                {
                        "from": "ELS",
                        "to": "REG",
                        "label": "ส่งข้อมูลคำขอวันที่ 2",
                        "api": "REG : /elss/api/v1/public/project/processData",
                        "params": "",
                        "db": "",
                        "notes": "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2 registerSeq=271 ส่ง ProcessOldSeq ด้วย",
                        "stepNum": "13"
                },
                {
                        "from": "REG",
                        "to": "ELS",
                        "label": "processSeq",
                        "isReturn": true,
                        "hideBubble": true,
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ได้ ProcessSeq กลับมาด้วย",
                        "stepNum": "13.1"
                },
                {
                        "from": "User",
                        "to": "ELS",
                        "label": "22. พิมพ์ใบแจ้งชำระเงิน ",
                        "api": "กรมบัญชีกลาง : PMT1|BillpaymentManage",
                        "params": "",
                        "db": "",
                        "notes": "สร้างใบแจ้งชำระเงิน ค่าใบอนุญาต",
                        "stepNum": "14"
                },
                {
                        "from": "User",
                        "to": "schedule",
                        "label": "23. ไป ชำระเงิน ภายใน 23.00",
                        "api": "กรมบัญชีกลาง : PMT2|CheckPaymentStatus",
                        "params": "",
                        "db": "",
                        "notes": "กวาด check สถานะชำระเงิน ทุก 15 นาที",
                        "stepNum": "15"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "24. สถานะ ชำระเงิน",
                        "api": "REG : /elss/api/v1/public/order/saveOrder",
                        "params": "",
                        "db": "",
                        "notes": "ส่งค่าใช้จ่ายไปยัง DOL2",
                        "stepNum": "16"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "25. รับเรื่องและเรียกคิว",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน",
                        "stepNum": "16.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "FIN",
                        "label": "26. ชำระเงิน ใบสั่ง E000X",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "เมนูพิมพ์ใบเสร็จชำระเงิน ",
                        "stepNum": "17"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "REG",
                        "label": "27. จดทะเบียน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "จดทะเบียน",
                        "stepNum": "18"
                },
                {
                        "from": "schedule",
                        "to": "REG",
                        "label": "28. เช็คสถานะ ",
                        "api": "REG : /elss/api/v1/public/project/getProcessStatus/",
                        "params": "",
                        "db": "",
                        "notes": "ตรวจสอบสถานะคำขอ",
                        "stepNum": "18.1"
                },
                {
                        "from": "เจ้าหน้าที่",
                        "to": "EVD",
                        "label": "29. แสกนหนังสือสำคัญ",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "แสกนหนังสือสำคัญ",
                        "stepNum": "18.2"
                },
                {
                        "from": "EVD",
                        "to": "ELS",
                        "label": "30. ส่งภาพแสกน",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "ไฟล์ DOL2 มา ELicense",
                        "stepNum": "34"
                },
                {
                        "from": "ELS",
                        "to": "minio",
                        "label": "31. ไฟล์ไปไว้ใน minio",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "",
                        "stepNum": "35"
                },
                {
                        "from": "ELS",
                        "to": "ELV",
                        "label": "32. insert ELV ให้",
                        "api": "",
                        "params": "",
                        "db": "",
                        "notes": "tb_elv_license_paper",
                        "stepNum": "36"
                }
        ],
        "activationBars": [
                {
                        "system": "ELS",
                        "startStepIdx": 0,
                        "endStepIdx": 1
                },
                {
                        "system": "ELS",
                        "startStepIdx": 2,
                        "endStepIdx": 5
                },
                {
                        "system": "REG",
                        "startStepIdx": 6,
                        "endStepIdx": 9
                },
                {
                        "system": "ELS",
                        "startStepIdx": 10,
                        "endStepIdx": 11
                },
                {
                        "system": "schedule",
                        "startStepIdx": 13,
                        "endStepIdx": 14
                },
                {
                        "system": "REG",
                        "startStepIdx": 17,
                        "endStepIdx": 18
                },
                {
                        "system": "REG",
                        "startStepIdx": 19,
                        "endStepIdx": 20
                },
                {
                        "system": "ELS",
                        "startStepIdx": 21,
                        "endStepIdx": 24
                },
                {
                        "system": "REG",
                        "startStepIdx": 23,
                        "endStepIdx": 24
                },
                {
                        "system": "schedule",
                        "startStepIdx": 26,
                        "endStepIdx": 27
                },
                {
                        "system": "REG",
                        "startStepIdx": 30,
                        "endStepIdx": 31
                },
                {
                        "system": "ELS",
                        "startStepIdx": 33,
                        "endStepIdx": 35
                }
        ]
}      
    ]
  },
  others: {
    title: "อื่นๆ (Others)",
    description: "ระบบและงานประมวลผลอื่นๆ",
    requests: [
      {
        id: "schedule-req-1",
        title: "1. งาน Schedule",
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
            label: "2. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ถ้า ชำระเงินแล้ว ส่งค่าใช้จ่ายไปยัง DOL2 ถ้าส่งไม่สำเร็จส่งใหม่ ทุก 5 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "3. ตรวจสอบสถานะ อนุมัติ/จดทะเบียน",
            api: "REG : /eLicense-service/elss/elss/api/v1/public/sec9/getProcessStatus/xxxxxxx",
            method: "GET",
            params: "",
            db: "",
            notes: "getProcessStatus ใช้เลข processSeq ทุก 15 นาที ตั้งแต่ 6.00 - 22.55 น."
          },          
          {
            from: "schedule",
            to: "REG",
            label: "4. มติคณะกรรมการ",
            api: "REG : /elss/api/v1/public................",
            method: "GET",
            params: "",
            db: "",
            notes: "เลขที่ใบอนุญาต"
          },
          {
            from: "schedule",
            to: "ELV",
            label: "5. สิ้นสุดใบอนุญาตดูดทราย ",
            api: "",
            params: "",
            db: "",
            notes: "update tb_elv_sec9_license_new.status_flag=F สิ้นสุดระยะเวลาของใบอนุญาต ทุก 23.58 น."
          },
        ]
      },
      {
        id: "elv-search-req",
        title: "2. ELV ค้นหาใบอนุญาต",
        description: "ค้นหาใบอนุญาต ",
        systems: ["User", "ELV", "REG", "EXP", "OPS"],
        meetingNotes: "การค้นหาใบอนุญาต:\n• เปิดให้ทั้งประชาชนและเจ้าหน้าที่สามารถสืบค้น/ตรวจสอบสถานะใบอนุญาตได้จริง",
        steps: [
          {
            from: "User",
            to: "ELV",
            label: "1. ค้นหาใบอนุญาตดูดทราย",
            api: "",
            params: "",
            db: "",
            notes: "ค้นจาก ฐาน ELV กับ DOL"
          },
          {
            from: "ELV",
            to: "EXP",
            label: "2. ส่งข้อมูลตรวจสอบใบอนุญาต",
            api: "EXP : /elss/elv/api/v1/license/sand......",
            method: "GET",
            params: "",
            db: "",
            notes: "ค้นในฐาน tb_elv_sec9_elicense_new และ ค้นใน DOL2"
          },
          {
            from: "User",
            to: "ELV",
            label: "3. ค้นหาใบอนุญาตจัดตั้งสำนักงานช่างรังวัดเอกชน",
            api: "",
            params: "",
            db: "",
            notes: "ค้นจาก OPS"
          },
          {
            from: "ELV",
            to: "OPS",
            label: "4. ค้นหาใบอนุญาตจัดตั้งสำนักงานช่างรังวัดเอกชน",
            api: "OPS : /xxxx/xxxx/xxxx/......",
            params: "",
            db: "",
            notes: "ค้นจาก OPS"
          },
          {
            from: "User",
            to: "ELV",
            label: "5. ค้นหาใบอนุญาตจัดสรรที่ดิน",
            api: "",
            params: "",
            db: "",
            notes: "ค้นจาก OPS"
          },
          {
            from: "ELV",
            to: "REG",
            label: "6. ค้นหาใบอนุญาตจัดสรรที่ดิน",
            api: "REG : /xxxx/xxxx/xxxx/......",
            params: "",
            db: "",
            notes: "ค้นจาก DOL"
          }
        ]
      },
      {
        id: "rpt-dashboard-req",
        title: "3. RPT Dashboard",
        description: "ระบบรายงานสถิติและ Dashboard ภาพรวมการดำเนินงานระบบ e-License และการออกใบอนุญาต",
        systems: ["เจ้าหน้าที่", "ELS", "RPT", "REG"],
        meetingNotes: "ระบบ Dashboard:\n• ประมวลผลแบบ Real-time และสรุปผลรายวัน\n• แสดงผลกราฟสถิติภาพรวมสำหรับผู้บริหารและเจ้าหน้าที่",
        steps: [
          
        ]
      }
    ]
  }
};

// Export dynamic module support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WORKFLOWS_DATA;
}
