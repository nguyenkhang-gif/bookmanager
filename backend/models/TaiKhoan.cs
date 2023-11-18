using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;
[Table("TaiKhoan")]
public partial class TaiKhoan
{
    [Key]
    public int? Id { get; set; }

    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? email { get; set; }
    public string? phone_number { get; set; }

    public byte[]? passwordHash { get; set; } // Change the data type to byte[]
    public byte[]? imageData { get; set; } // Change the data type to byte[]
    public byte[]? passwordSalt { get; set; }

    public bool? Gioitinh { get; set; }

    public DateTime? Ngaysinh { get; set; }

    public int? Bikhoa { get; set; }

    public int? Quyen { get; set; }

    // public virtual ICollection<NhanXet> NhanXets { get; set; } = new List<NhanXet>();

    // public virtual ICollection<PhieuMuon> PhieuMuons { get; set; } = new List<PhieuMuon>();

    // public virtual ICollection<YeuThich> YeuThiches { get; set; } = new List<YeuThich>();
}
