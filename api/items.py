from fastapi import APIRouter
from config.database import connect
from models.master_model import createResponse
from models.form_model import EditItem,AddItem,SearchByBarcode,SearchByCategory
# from models.otp_model import generateOTP
from datetime import datetime

# testing git
itmRouter = APIRouter()


#Select items
#-------------------------------------------------------------------------------------------------------------
@itmRouter.get('/items/{comp_id}')
async def show_items(comp_id:int):
    conn = connect()
    cursor = conn.cursor()
    query = f"SELECT a.*, b.*, c.unit_name, d.category_name FROM md_items a JOIN md_item_rate b on a.id=b.item_id JOIN md_category d on d.sl_no = a.catg_id LEFT JOIN md_unit c on c.sl_no=a.unit_id WHERE a.comp_id={comp_id}"
    cursor.execute(query)
    records = cursor.fetchall()
    result = createResponse(records, cursor.column_names, 1)
    conn.close()
    cursor.close()
    return result

# Edit item_rate
#-------------------------------------------------------------------------------------------------------------
@itmRouter.post('/edit_item')
async def edit_items(edit_item:EditItem):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    conn = connect()
    cursor = conn.cursor()
    query = f"UPDATE md_item_rate JOIN md_items ON md_items.id=md_item_rate.item_id SET md_items.item_name = '{edit_item.item_name}', md_item_rate.price = {edit_item.price}, md_item_rate.discount = {edit_item.discount}, md_item_rate.cgst = {edit_item.cgst}, md_item_rate.sgst = {edit_item.sgst},md_item_rate.purchase_price = {edit_item.purchase_price},md_item_rate.sale_price = {edit_item.selling_price},md_items.bar_code = '{edit_item.barcode}', md_items.description = '{edit_item.description}', md_items.alert = '{edit_item.alert}',md_items.unit_id={edit_item.unit_id}, md_items.catg_id={edit_item.catg_id}, md_item_rate.modified_by = '{edit_item.modified_by}', md_item_rate.modified_dt = '{formatted_dt}', md_items.modified_by = '{edit_item.modified_by}', md_items.modified_dt = '{formatted_dt}' WHERE md_item_rate.item_id={edit_item.item_id} AND md_items.comp_id={edit_item.comp_id}"
    cursor.execute(query)
    conn.commit()
    conn.close()
    cursor.close()
    # print(query,"[[[[[[]]]]]]")
    # print(cursor.rowcount)
    # print(query)
    if cursor.rowcount>0:
        resData= {
        "status":1,
        "data":"data edited successfully"
        }
    else:
        resData= {"status":0, "data":"data not edited"}
       
    return resData

# Add items
#---------------------------------------------------------------------------------------------------------------------------
@itmRouter.post('/add_item')
async def add_items(add_item:AddItem):
    current_datetime = datetime.now()
    formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    conn = connect()
    cursor = conn.cursor()
    query = f"INSERT INTO md_items(comp_id, hsn_code, item_name, bar_code, unit_id, catg_id, description, stock_alert, created_by, created_dt) VALUES ({add_item.comp_id}, '{add_item.hsn_code}', '{add_item.item_name}','{add_item.barcode}', {add_item.unit_id}, {add_item.catg_id},'{add_item.description}','{add_item.alert}','{add_item.created_by}', '{formatted_dt}')"
    cursor.execute(query)
    conn.commit()
    
    # print(cursor.rowcount)
    # print(query)
    if cursor.rowcount>0:
        conn.close()
        cursor.close()
        conn1 = connect()
        cursor1 = conn1.cursor()
        query1 = f"INSERT INTO md_item_rate (item_id, price, sale_price,purchase_price, discount, cgst, sgst, created_by, created_dt) VALUES ({cursor.lastrowid}, {add_item.price},{add_item.sale_price}, {add_item.purchase_price}, {add_item.discount}, {add_item.cgst}, {add_item.sgst}, '{add_item.created_by}', '{formatted_dt}')"
        cursor1.execute(query1)
        conn1.commit()
        item_id = cursor.lastrowid
        if cursor1.rowcount>0:
            
            conn2 = connect()
            cursor2 = conn2.cursor()
            query2 = f"INSERT INTO td_stock (comp_id, br_id, item_id, stock, created_by, created_dt) VALUES ({add_item.comp_id}, {add_item.br_id}, {item_id}, {add_item.opening_stock}, '{add_item.created_by}', '{formatted_dt}')"
            cursor2.execute(query2)
            print(query2)
            conn2.commit()
            conn2.close()
            cursor2.close()
            conn1.close()
            cursor1.close()
            conn.close()
            cursor.close()
            current_datetime = datetime.now()
            formatted_dt = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
            conn = connect()
            cursor = conn.cursor()
            query = f"insert into td_stock_ledger (stock_trn_dt,stock_trn_id,comp_id, br_id, item_id, transaction_type, stock_qty, batch_no, expiry_dt,created_dt, created_by ) values (date('{formatted_dt}'), '{current_datetime}', {add_item.comp_id}, {add_item.br_id}, {item_id},'O', {add_item.opening_stock},'{add_item.batch_no}','{add_item.expiry_dt}', date('{formatted_dt}'), '{add_item.created_by}')"
            cursor.execute(query)
            print(query)
            conn.commit()
           
            if cursor.rowcount>0:
                resData={"status":1, "data": "Item and Stock Added Successfully"}
            else:
                resData={"status":0, "data": "No Stock Added"}
        else:
            resData= {"status":0, "data":"Item Rate not Added"}
    else:
        resData={"status":-1, "data":"No Data Added"}
        conn.close()
        cursor.close()
    return resData

#===============================================================================================
#==================================================================================================
# Search item info by barcode

@itmRouter.post('/search_by_barcode')
async def search_by_barcode(bar:SearchByBarcode):
    conn = connect()
    cursor = conn.cursor()
    query = f"SELECT a.id, a.comp_id, a.hsn_code, a.item_name, a.description, a.unit_id, a.bar_code, a.created_by, a.created_dt, a.modified_by, a.modified_dt, b.item_id, b.price, b.discount, b.cgst, b.sgst, c.unit_name FROM md_items a JOIN md_item_rate b on a.id=b.item_id LEFT JOIN md_unit c on c.sl_no=a.unit_id WHERE a.comp_id={bar.comp_id} and a.bar_code='{bar.bar_code}'"
    cursor.execute(query)
    records = cursor.fetchall()
    result = createResponse(records, cursor.column_names, 1)
    conn.close()
    cursor.close()
    if cursor.rowcount>0:
        res_dt={"status":1, "msg":result}
    else:
        res_dt={"status":0, "msg":[]}
    return res_dt

#===============================================================================================

