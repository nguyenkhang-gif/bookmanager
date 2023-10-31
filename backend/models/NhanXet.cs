using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;

[Table("NhanXet")]
public partial class NhanXet
{
    [Key]
    public int Id { get; set; }

    public int? Sachid { get; set; }

    public string? Tieude { get; set; }

    public int? Userid { get; set; }
    public int? rating { get; set; }

    public DateTime? Ngaydang { get; set; }

    public virtual Dbosach? Sach { get; set; }

    public virtual TaiKhoan? User { get; set; }
}
