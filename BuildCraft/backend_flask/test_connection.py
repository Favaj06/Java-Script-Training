import pymysql

try:
    connection = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="Favaj06@",
        database="buildcraft_db",
        port=3306
    )

    print("✅ Connected Successfully!")

    connection.close()

except Exception as e:
    print("❌ Error:", e)