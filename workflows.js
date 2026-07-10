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
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2"
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
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "User",
            to: "schedule",
            label: "10. กรณี ตรวจผ่าน ไป ชำระเงิน",
            api: "กรมบัญชีกลาง : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "12. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "13. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "14. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },{
            from: "schedule",
            to: "REG",
            label: "15. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "16.ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "17. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "18. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "19. (อาจจะไม่มี) รอออกใบอนุญาต",
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
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2"
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
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "User",
            to: "schedule",
            label: "10. กรณี ตรวจผ่าน ไป ชำระเงิน",
            api: "กรมบัญชีกลาง : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "12. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "13. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "14. จดทะเบียน",
            api: "",
            params: "",
            db: "",
            notes: "เมนูจดทะเบียน จบงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "15. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "16.ดำเนินการตามขั้นตอน EXP กรอกข้อมูลใบอนุญาตและแสกนใยอนุญาต",
            api: "",
            params: "",
            db: "",
            notes: "เมนู ทะเบียนใบอนุญาตมาตรา 9(2) หน้า EXPSREG004"
          },
           {
            from: "EXP",
            to: "ELS",
            label: "17.ส่งข้อมูลใบอนุญาตและภาพแสกน",
            api: "",
            params: "",
            db: "",
            notes: "ส่งข้อมูลใบอนุญาตดูดทรายมายัง eLicense"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "18.insert ELV ให้",
            api: "",
            params: "",
            db: "",
            notes: "tb_elv_sec9_license_new"
          },
          {
            from: "ELS",
            to: "minio",
            label: "19.ภาพแสกน และ Gen PDF ใส่ Timestamp + CA",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู การ Gen flie "
          },
          {
            from: "ELS",
            to: "ELV",
            label: "20.",
            api: "",
            params: "",
            db: "",
            notes: "เจมส์ดู หยอดค่า tb_elv_sec9_license,tb_elv_sec9_license_paper"
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
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2"
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
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "User",
            to: "schedule",
            label: "10. กรณี ตรวจผ่าน ไป ชำระเงิน",
            api: "กรมบัญชีกลาง : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "12. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "13. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "14. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "เมนูอนุมัติรับคำขอ ส่งเรื่องไปให้ EXP "
          },{
            from: "schedule",
            to: "REG",
            label: "15. เช็คสถานะ ",
            api: "REG : /elss/api/v1/public/sec9/getProcessStatus/",
            params: "",
            db: "",
            notes: "ตรวจสอบสถานะคำขอ"
          },
          {
            from: "เจ้าหน้าที่",
            to: "EXP",
            label: "16.ดำเนินการตามขั้นตอน EXP เจ้าหน้าที่กรอกข้อมูล",
            api: "",
            params: "",
            db: "",
            notes: "เจ้าหน้าที่ดำเนินการกรอกข้อมูลบันทึกข้อมูลหน้า EXPSPROC002"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "17. อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : ext/requests/workflow/committee/approve",
            params: "",
            db: "",
            notes: "ผลพิจารณา คณะกรรมการอนุญาต"
          },
          {
            from: "EXP",
            to: "ELS",
            label: "18. ไม่อนุญาต (ผลพิจารณา คณะกรรมการอนุญาต)",
            api: "ELS : /ext/requests/workflow/committee/reject",
            params: "",
            db: "",
            notes: "ส่งอีเมลแจ้งผลไม่อนุญาต (send mail)"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "19. (อาจจะไม่มี) รอออกใบอนุญาต",
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
            notes: "ส่งข้อมูลคำขอรายละเอียดคำขอไปยัง DOL2"
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
            notes: "ส่งรายการหลักฐานประกอบคำขอไปยัง DOL2"
          },
          {
            from: "User",
            to: "schedule",
            label: "10. กรณี ตรวจผ่าน ไป ชำระเงิน",
            api: "กรมบัญชีกลาง : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "11. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },
          {
            from: "ELS",
            to: "ELV",
            label: "12.(flow เดิม) เอาใบอนุญาตเดิม มาใส่คำว่าใบแทน",
            api: "",
            params: "",
            db: "",
            notes: "ใบแทน tb_elv_elicense"
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
            label: "15. อนุมัติรับคำขอ",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "16. เช็คสถานะ ",
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
            to: "schedule",
            label: "2. ไป ชำระเงิน",
            api: "กรมบัญชีกลาง : /elss/api/v1/public/evd/sendEvd",
            params: "",
            db: "",
            notes: "กวาด check สถานะชำระเงิน ทุก 15 นาที"
          },
          {
            from: "schedule",
            to: "REG",
            label: "3. สถานะ ชำระเงิน",
            api: "REG : /elss/api/v1/public/order/saveOrder",
            params: "",
            db: "",
            notes: "ส่งค่าใช้จ่ายไปยัง DOL2"
          },          
          {
            from: "ELS",
            to: "ELV",
            label: "4. คาดใบอนุญาตสีแดง ว่ายกเลิก",
            api: "ELV : elss/pdf/api/v1/license/sand/cancel-uploaded",
            params: "",
            db: "",
            notes: "ปรับเปลี่ยนสถานะใบอนุญาตเป็นยกเลิก UPDATE tb_elv_sec9_license_new SET status_flag='C'"
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "5. รับเรื่องและเรียกคิว",
            api: "",
            params: "",
            db: "",
            notes: "เมนูประชาสัมพันธ์รับเรื่องและต้องเรียกคิว ใบสั่งจะส่งไปให้การเงิน"
          },
          {
            from: "เจ้าหน้าที่",
            to: "FIN",
            label: "6. ชำระเงิน ใบสั่ง E000X",
            api: "",
            params: "",
            db: "",
            notes: "เมนูพิมพ์ใบเสร็จชำระเงิน "
          },
          {
            from: "เจ้าหน้าที่",
            to: "REG",
            label: "7. จดทะเบียน",
            api: "",
            params: "",
            db: "",
            notes: "จบการทำงานของทะเบียน"
          },
          {
            from: "schedule",
            to: "REG",
            label: "16. เช็คสถานะ ",
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
        description: "ขั้นตอนการยื่นคำขอเพื่อรับใบอนุญาตทำการจัดสรรที่ดิน",
        systems: ["User", "minio", "ELS", "schedule", "ELV", "เจ้าหน้าที่","REG", "FIN"],
        meetingNotes: "",
        steps: []
          
        
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
  }
};

// Export dynamic module support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WORKFLOWS_DATA;
}
