using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend;
[Table("YeuThich")]
public partial class YeuThich
{
    [Key]
    public int id {get;set;}
    public int? Sachid { get; set; }
    
    public int? taikhoanid { get; set; }

    public virtual TaiKhoan? User { get; set; }
}
