using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend;
public partial class YeuThich
{
    [Key]
    public int? Sachid { get; set; }
    
    public string? Userid { get; set; }

    public virtual TaiKhoan? User { get; set; }
}
