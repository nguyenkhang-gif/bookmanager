using System;
using System.Collections.Generic;

namespace backend;

public partial class TaiKhoan
{
    public string Id { get; set; } = null!;

    public string? Username { get; set; }

    public string? Password { get; set; }

    public bool? Gioitinh { get; set; }

    public DateTime? Ngaysinh { get; set; }

    public int? Bikhoa { get; set; }

    public int? Quyen { get; set; }

    public virtual ICollection<NhanXet> NhanXets { get; set; } = new List<NhanXet>();

    public virtual ICollection<PhieuMuon> PhieuMuons { get; set; } = new List<PhieuMuon>();

    public virtual ICollection<YeuThich> YeuThiches { get; set; } = new List<YeuThich>();
}
